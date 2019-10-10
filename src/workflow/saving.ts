import { Player } from '../models/player';
import constants from '../globals/constants';
import { writeFile } from 'fs-extra';
import inquirer = require('inquirer');
import { responseToBoolean } from '../transformers/response';

export async function savePlayer(player: Player): Promise<void> {
  askToSave(player)
  .then(confirm => {
    if (confirm) {
      const now: number = new Date().getTime();
      const fileName: string =  `${constants.savesPath}/${player.name}_${now}.json`;
      const playerData = JSON.stringify(player, null, 2);
      return writeFile(fileName, playerData, 'utf8');
    }
  })
  .catch(err => {
    console.error('savePlayer', err);
    throw err;
  });
}

async function askToSave(player: Player): Promise<boolean> {
  const message: string = `Do you wanna save ${player.name} (lvl ${player.level})`;
  return inquirer.prompt([
    {
      type: 'list',
      name: 'confirmSave',
      message,
      choices: ['Yes', 'No'],
    },
  ])
  .then(answers => responseToBoolean(answers.confirmSave))
  .catch(err => {
    console.error('askToSave', err);
    throw err;
  });
}
