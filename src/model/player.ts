import { writeFile, readFile } from 'fs-extra';
import * as path from 'path';

export enum ItemType {
  RESOURCE = 'RESOURCE',
  EQUIPMENT = 'EQUIPMENT',
}

export class InventoryItem {
  constructor(inventoryItem: InventoryItem) {
    copy(inventoryItem, this);
  }
  name: string;
  description: string;
  type: ItemType;
  pods: number;
}

export class Inventory {
  constructor(inventory: Inventory) {
    this.items = new Array<InventoryItem>();
    inventory.items.forEach(item => {
      this.items.push(new InventoryItem(item));
    });
    copy(inventory, this);
  }
  items: InventoryItem[];
  maxPods: number;

  display() {
    console.table(this.items);
  }
}

export class Location {
  constructor(location: Location) {
    copy(location, this);
  }
  x: number;
  y: number;
}

export class Spell {
  constructor(spell: Spell) {
    copy(spell, this);
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

    copy(player, this);
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
export async function loadPlayer(file: string): Promise<Player> {
  return readFile(file, 'utf8').then((data) => {
    const player: Player = JSON.parse(data) as Player;

    return new Player(player);

  }).catch(err => {
    console.error(err);
    return new Player(null);
  });
}

function copy(src: any, target: any) {
  for (const key in src) {
    if (src.hasOwnProperty(key) && typeof src[key] !== 'object') {
      target[key] = src[key];
    }
  }
}
