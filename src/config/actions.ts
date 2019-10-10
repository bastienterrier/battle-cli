import { Action, ActionType } from '../models/action';

export const actions: Action[] = [
  {
    id: 0,
    message: 'Go somewhere',
    type: ActionType.EXPLORATION,
    locations: [{x: 0, y: 0}],
    choices: [
      {
        message: 'North ↑',
        callback: 'goNorth',
      },
      {
        message: 'East ⟶',
        callback: 'goEast',
      },
      {
        message: 'South ↓',
        callback: 'goSouth',
      },
      {
        message: 'West ⟵',
        callback: 'goWest',
      },
    ],
  },
];
