#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { randomSGID } from '../src/index.js';

const { argv } = yargs(hideBin(process.argv))
  .scriptName('sgid')
  .usage('Usage: $0 [char]')
  .command(
    '$0 [char]',
    'Specify an optional starting character',
    (args) => {
      args.positional('char', {
        type: 'string',
        describe: 'the first character in the generated SGID, random by default',
        choices: ['s', 'S', 't', 'T', 'f', 'F', 'g', 'G', 'm', 'M'],
      });
    },
  )
  .alias('h', 'help')
  .alias('v', 'version')
  .help();

const input = argv.char || '';
console.log(await randomSGID(input));
