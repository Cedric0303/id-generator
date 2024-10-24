import { test, expect } from 'bun:test';
import randomSGID from '../src/sgid';

test('should generate a single SGID', async () => {
  const sgid = await randomSGID();
  expect(sgid.length).toEqual(9);
  expect(/^[A-Za-z]\d{7}[A-Za-z]$/.test(sgid)).toEqual(true);
});
