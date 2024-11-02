#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { randomHKID } from '../src/index.js';

await yargs(hideBin(process.argv))
  .scriptName('hkid')
  .usage('Usage: $0')
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv;

console.log(await randomHKID());
