import { loadPlayer } from './workflow/loading';

console.log('WIP');

loadPlayer().then(player => {
  player.inventory.display();
});
