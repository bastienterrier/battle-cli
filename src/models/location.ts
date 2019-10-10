import { copyProperties } from '../helpers/utils';

export class Location {

  x: number;
  y: number;

  constructor(location: Location) {
    copyProperties(location, this);
  }
}
