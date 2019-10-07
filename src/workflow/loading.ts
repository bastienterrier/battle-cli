import { Player } from '../models/player';
import { readFile, readdir } from 'fs-extra';
import constants from '../globals/constants';
import * as inquirer from 'inquirer';
import { humanizeFilename } from '../transformers/file';

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
      interface DisplayedFile {
        filename: string;
        humanizeFilemane: string;
      }
      const displayedFiles: DisplayedFile[] = files.map(f => {
        return {
          filename: f,
          humanizeFilemane: humanizeFilename(f),
        };
      });
      return inquirer.prompt([
        {
          type: 'list',
          name: 'filename',
          message: 'Which file do you wanna load?',
          choices: displayedFiles.map(f => f.humanizeFilemane),
          filter: (val) => {
            return displayedFiles.find(f => f.humanizeFilemane === val).filename;
          },
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
