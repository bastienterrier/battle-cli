import { Location } from './location';

export class ActionCallback {
  message: string;
  callback: string;
}

export enum ActionType {
  FIGHT = 'FIGHT',
  EXPLORATION = 'EXPLORATION',
  ALL = 'ALL',
}

export class Action {
  constructor() {
    this.locations = new Array();
    this.choices = new Array();
  }

  id: number;
  type: ActionType;
  message: string;
  locations: Location[];
  choices: ActionCallback[];
}
