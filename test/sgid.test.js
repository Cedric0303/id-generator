/* eslint-disable no-await-in-loop */
import { test, expect, describe } from 'bun:test';
import { randomSGID, isValidSGID } from '../src/index.js';

describe('Test SGID validator', () => {
  test('should return true on a valid SGID', async () => {
    const sgid = 'M3742542N';
    expect(isValidSGID(sgid)).toBeTrue();
  });
  test('should return false on an invalid SGID', async () => {
    const sgid = 'S1234121A';
    expect(isValidSGID(sgid)).toBeFalse();
  });
});

describe('Test SGID generator', () => {
  test('should generate a single valid SGID', async () => {
    const sgid = await randomSGID();
    expect(isValidSGID(sgid)).toBeTrue();
  });

  test('should generate 100 valid SGIDs', async () => {
    const sgids = await Promise.all(Array(100).fill().map(() => randomSGID()));
    expect(sgids.every(isValidSGID)).toBeTrue();
  });
});
