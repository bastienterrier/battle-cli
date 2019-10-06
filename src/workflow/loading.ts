import { Player } from '../models/player';
import { readFile, readdir } from 'fs-extra';
import constants from '../globals/constants';
import * as inquirer from 'inquirer';

async function loadSave(file: string): Promise<Player> {
  return readFile(file, 'utf8')
    .then((data) => JSON.parse(data) as Player)
    .catch(err => {
      console.error('loadSave', err);
      throw err;
    });
}

async function selectSave(): Promise<string> {
  return readdir(constants.savesPath)
    .then((files) => {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'filename',
          message: 'Which file do you wanna load?',
          choices: files,
        },
      ]);
    })
    .then(answers => `${constants.savesPath}/${answers.filename}`)
    .catch(err => {
      console.error('selectSave', err);
      throw err;
    });
}

export async function loadPlayer(): Promise<Player> {
  return selectSave()
    .then(filename => {
      return loadSave(filename);
    })
    .then(player => new Player(player))
    .catch((err) => {
      console.error('loadPlayer', err);
      throw err;
    });
}
