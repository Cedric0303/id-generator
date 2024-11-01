import { test, expect } from 'bun:test';
import { randomHKID, isValidHKID } from '../src/index.js';

test('should generate a single HKID', async () => {
  const hkid = await randomHKID();
  expect(isValidHKID(hkid)).toBeTrue();
});
