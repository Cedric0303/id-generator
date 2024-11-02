#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { randomSGID } from '../src/index.js';

const argv = await yargs(process.argv.slice(2))
  .scriptName('sgid')
  .usage('Usage: $0 <c>')
  .command('<c>', 'Specify a starting character (optional)')
  .example([
    ['$0'],
    ['$0 S'],
    ['$0 T'],
    ['$0 F'],
    ['$0 G'],
    ['$0 M'],
  ])
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv;

const input = argv._[0];
console.log(await randomSGID(input));
