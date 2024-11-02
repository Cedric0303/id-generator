#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { randomHKID } from '../src/index.js';

await yargs(process.argv.slice(2))
  .scriptName('hkid')
  .usage('Usage: $0')
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv;

console.log(await randomHKID());
