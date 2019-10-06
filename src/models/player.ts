import { writeFile, readFile } from 'fs-extra';
import * as path from 'path';
import { copyProperties } from '../helpers/utils';

export enum ItemType {
  RESOURCE = 'RESOURCE',
  EQUIPMENT = 'EQUIPMENT',
}

export class InventoryItem {
  constructor(inventoryItem: InventoryItem) {
    copyProperties(inventoryItem, this);
  }
  name: string;
  description: string;
  type: ItemType;
  pods: number;
  quantity: number;
}

export class Inventory {
  constructor(inventory: Inventory) {
    this.items = new Array<InventoryItem>();
    inventory.items.forEach(item => {
      this.items.push(new InventoryItem(item));
    });
    copyProperties(inventory, this);
  }
  items: InventoryItem[];
  maxPods: number;

  display() {
    console.table(this.items);
  }
}

export class Location {
  constructor(location: Location) {
    copyProperties(location, this);
  }
  x: number;
  y: number;
}

export class Spell {
  constructor(spell: Spell) {
    copyProperties(spell, this);
  }
  name: string;
  description: string;
  mana: number;
  damage: number;
}

export class Player {
  constructor(player: Player = null) {
    this.setPlayer(player);
  }

  setPlayer(player: Player) {
    this.spells = new Array<Spell>();
    player.spells.forEach(spell => {
      this.spells.push(new Spell(spell));
    });
    this.location = new Location(player.location);
    this.inventory = new Inventory(player.inventory);

    copyProperties(player, this);
  }
  name: string;
  level: number;

  gold: number;

  location: Location;

  inventory: Inventory;

  spells: Spell[];
  currentMana: number;
  maxMana: number;

  levelUp() {
    this.level ++;
  }

  save(): Promise<void> {
    const srcDir = path.dirname(require.main.filename) + '/';

    const now: string = new Date().toJSON().slice(0, 19).replace(/[-T:]/g, '');
    const fileName: string = `${srcDir}../saves/${this.name}_${now}.json`;
    const data = JSON.stringify(this, null, 2);
    return writeFile(fileName, data, 'utf8');
  }
}
