/* eslint-disable no-await-in-loop */
import { test, expect, describe } from 'bun:test';
import { randomHKID, isValidHKID } from '../src/index.js';

const DISABLE_COPY = true;

describe('Test HKID validator', () => {
  test('should return true on a valid HKID', async () => {
    const hkid = 'F1478326';
    expect(isValidHKID(hkid)).toBeTrue();
  });
  test('should return false on an invalid HKID', async () => {
    const hkid = 'S1234121';
    expect(isValidHKID(hkid)).toBeFalse();
  });
});

describe('Test HKID generator', () => {
  test('should generate a single valid HKID', async () => {
    const hkid = await randomHKID(DISABLE_COPY);
    expect(isValidHKID(hkid)).toBeTrue();
  });

  test('should generate 10000 valid HKIDs', async () => {
    const hkids = await Promise.all(Array(10000).fill().map(() => randomHKID(DISABLE_COPY)));
    expect(hkids.every(isValidHKID)).toBeTrue();
  });
});
