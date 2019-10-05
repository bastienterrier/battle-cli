import { Player, ItemType } from './player';

export default {
  name: 'Masterdevil',
  level: 2,
  gold: 300,
  inventory: {
    items: [
      {
        name: 'Rotten stick',
        description: 'A poor wood stick found in the wood',
        pods: 10,
        type: ItemType.EQUIPMENT,
      },
      {
        name: 'Small mana potion',
        description: 'A little flask of mana',
        pods: 2,
        type: ItemType.RESOURCE,
      },
    ],
    maxPods: 100,
  },
  location: {
    x: 0,
    y: 0,
  },
  spells: [
    {
      name: 'Expelliarmus',
      damage: 10,
      description: 'Expelliarmus !',
      mana: 20,
    },
  ],
  currentMana: 24,
  maxMana: 30,
} as Player;
