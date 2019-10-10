import { loadPlayer } from './workflow/loading';
import { savePlayer } from './workflow/saving';
import { callToAction, executeAction } from './workflow/cta';
import { ActionType } from './models/action';

console.log('WIP');

loadPlayer().then(player => {
  // player.inventory.display();
  // player.levelUp();

  callToAction(player, ActionType.ALL)
  .then(action => {
    executeAction(player, action);
  },

  );
  // return savePlayer(player);
});
