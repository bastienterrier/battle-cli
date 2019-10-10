import { copyProperties } from '../helpers/utils';
import { Location } from './location';

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

}
