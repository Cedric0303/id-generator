#!/usr/bin/env node

import { randomSGID } from '../src/index.js';

const input = process.argv.at(2);
console.log(await randomSGID(input));
