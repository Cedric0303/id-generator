#!/usr/bin/env node

import { randomHKID } from '../src/index.js';

console.log(await randomHKID());
