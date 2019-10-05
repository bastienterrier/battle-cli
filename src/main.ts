import { loadPlayer } from './model/player';
import inquirer = require('inquirer');
import { readdir } from 'fs-extra';
import * as path from 'path';

const srcDir = path.dirname(require.main.filename) + '/';

async function start() {

  const files: string[] = await readdir(srcDir + '../saves');
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'filename',
      message: 'Which file do you wanna load?',
      choices: files,
    },
  ]);

  const player = await loadPlayer(srcDir + '../saves/' + answers.filename);
  console.log(player.level);
  player.levelUp();

  // player.inventory.display();

  player.save().then(() =>
    console.log('saved!'),
  ). catch (err => console.error(err));
}

start().then(() => {
  console.log('started!');
}).catch((err) => console.error(err));
