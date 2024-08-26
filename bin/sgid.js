#!/usr/bin/env node

import { randomSGID } from '../src/index.js';

console.log(await randomSGID());
