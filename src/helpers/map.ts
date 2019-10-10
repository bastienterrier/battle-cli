import { Player } from '../models/player';
import { Location } from '../models/location';
import { map, mapPlaceByCode } from '../config/map';

export function getPlaceByLocation(location: Location): string {
  const code: number = map[location.x][location.y];
  return mapPlaceByCode[code];
}

export function displayPlayerPlace(player: Player);
