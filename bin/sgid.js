#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { copy } from 'copy-paste';

import { hideBin } from 'yargs/helpers';
import { randomSGID } from '../src/index.js';

const { argv } = yargs(hideBin(process.argv))
  .scriptName('sgid')
  .usage('Usage: $0 [num] [char]')
  .command(
    '$0 [num] [char]',
    '',
    (args) => {
      args
        .positional('num', {
          type: 'number',
          describe: 'number of SGID to generate',
          default: 1,
          coerce: (value) => value || 1,
        })
        .positional('char', {
          type: 'string',
          describe: 'first character in the generated SGID',
          choices: ['s', 'S', 't', 'T', 'f', 'F', 'g', 'G', 'm', 'M', ''],
          coerce: (value) => value || '',
        });
    },
  )
  .alias('h', 'help')
  .alias('v', 'version')
  .help();

const { char, num } = argv;

const val = (num > 1) ? await Promise.all(Array(num).fill().map(() => randomSGID(char, num > 1))) : await randomSGID(char, num > 1);

// eslint-disable-next-line no-console
console.log(copy(val));
