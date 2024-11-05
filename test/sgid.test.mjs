/* eslint-disable no-await-in-loop */
import { test, expect, describe } from 'bun:test';
import { randomSGID, isValidSGID } from '../src/index.mjs';

const DISABLE_COPY = true;

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
    const sgid = await randomSGID(undefined, DISABLE_COPY);
    expect(isValidSGID(sgid)).toBeTrue();
  });

  test('should generate 10000 valid SGIDs', async () => {
    const sgids = await Promise.all(Array(10000).fill().map(() => randomSGID(undefined, DISABLE_COPY)));
    expect(sgids.every(isValidSGID)).toBeTrue();
  });
});
