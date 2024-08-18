import { test, expect } from 'bun:test';
import randomHKID from '../src/hkid';

test('should generate a single HKID', () => {
  const hkid = randomHKID();
  expect(hkid.length).toBeOneOf([8, 9]);
  expect(/\d{6,7}/.test(hkid)).toEqual(true);
  expect(/[a-zA-Z]{1,2}/.test(hkid)).toEqual(true);
});
