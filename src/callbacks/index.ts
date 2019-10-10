import { Player } from '../models/player';
import { MAP_HEIGHT, MAP_WIDHT } from '../config/map';

async function goNorth(player: Player): Promise<void> {
  console.log('MAP_HEIGHT' + MAP_HEIGHT);
  console.log(MAP_WIDHT);
  player.location.y ++;
}

export default {
  goNorth,
};
