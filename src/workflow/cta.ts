import { Player } from '../models/player';
import inquirer = require('inquirer');
import { Action, ActionType } from '../models/action';
import { actions } from '../config/actions';
import callbacks from '../callbacks';

function filterActionsByType(player: Player, type: ActionType) {
  return actions.filter(action => type === ActionType.ALL || action.type === type);
}

export async function callToAction(player: Player, type: ActionType): Promise<Action> {

  const filteredActions: Action[] =  filterActionsByType(player, type).filter(action => isActionAvailable(player, action));
  const filteredActionsMessage: string[] = filteredActions.map(action => action.message);

  return inquirer.prompt([
    {
      type: 'list',
      name: 'callToAction',
      message: 'What do you wanna do?',
      choices: filteredActionsMessage,
    },
  ])
  .then(answers => answers.callToAction)
  .then(actionMessage => {
    return filteredActions.find(action => action.message === actionMessage);
  })
  .catch(err => {
    console.error('callToAction', err);
    throw err;
  });

}

export async function executeAction(player: Player, action: Action): Promise<any> {
  const choicesMessage: string[] = action.choices.map(choice => choice.message);
  return inquirer.prompt([
    {
      type: 'list',
      name: 'actionChoice',
      message: action.message,
      choices: choicesMessage,
    },
  ])
  .then(answers => answers.actionChoice)
  .then(actionChoiceMessage => action.choices.find(choice => choice.message === actionChoiceMessage))
  .then(actionChoice => {
    callbacks[actionChoice.callback](player);
  })
  .catch(err => {
    console.error('executeAction', err);
    throw err;
  });
}

function isActionAvailable(player: Player, action: Action): boolean {
  if (action.locations.length === 0) {
    return true;
  }
  let result: boolean = false;
  action.locations.find(l => {
    if (l.x === player.location.x && l.y === player.location.y) {
      result = true;
    }
  });
  return result;
}
