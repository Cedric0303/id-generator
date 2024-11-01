import { test, expect } from 'bun:test';
import { randomSGID, isValidSGID } from '../src/index.js';

test('should generate a single SGID', async () => {
  const sgid = await randomSGID();
  expect(isValidSGID(sgid)).toBeTrue();
});
