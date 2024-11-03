#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { copy } from 'copy-paste';

import { hideBin } from 'yargs/helpers';
import { randomHKID } from '../src/index.js';

const { argv } = yargs(hideBin(process.argv))
  .scriptName('hkid')
  .usage('Usage: $0 [num]')
  .command(
    '$0 [num]',
    '',
    (args) => {
      args
        .positional('num', {
          type: 'number',
          describe: 'number of HKID to generate',
          default: 1,
          coerce: (value) => value || 1,
        });
    },
  )
  .alias('h', 'help')
  .alias('v', 'version')
  .help();

const { num } = argv;

const val = (num > 1) ? await Promise.all(Array(num).fill().map(() => randomHKID(num > 1))) : await randomHKID(num > 1);

// eslint-disable-next-line no-console
console.log(copy(val));
