import { randomInt } from 'crypto';
import { copy } from 'copy-paste';

const getChecksumTable = (firstChar) => {
  const checksums = {
    ST: ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'],
    FG: ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'],
    M: ['K', 'L', 'J', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X'],
  };

  const key = Object.keys(checksums).filter((v) => v.includes(firstChar));
  if (!key || !key.length) throw new Error(`Unable to find checksum table for "${firstChar}"`);

  const lookupKey = key[0];

  return checksums[lookupKey];
};

/**
 * Calculate checksum digit
 * @param {string}  charPart - Alphabet in SGID
 * @param {string}  numPart - First 7 numerber in SGID
 * @returns  {(number|string)}
 */
const calculateChecksum = (firstChar, digitStr) => {
  // Multiply each of the digits by the respective weights
  const digits = digitStr.split('').map(Number);
  digits[0] *= 2;
  digits[1] *= 7;
  digits[2] *= 6;
  digits[3] *= 5;
  digits[4] *= 4;
  digits[5] *= 3;
  digits[6] *= 2;

  // Calculate total, offset based on first character, and modulus 11
  const weight = digits.reduce((a, b) => a + b);
  // eslint-disable-next-line no-nested-ternary
  const offset = firstChar === 'T' || firstChar === 'G' ? 4 : firstChar === 'M' ? 3 : 0;
  let index = (offset + weight) % 11;

  // If firstChar is M, rotate the index
  if (firstChar === 'M') index = 10 - index;

  // Get the value of the index in the checksum array based on firstChar
  const table = getChecksumTable(firstChar);

  // Return the value of the index in the checksum table
  return table[index];
};

/**
 * Generate random SGID
 * @returns  {string}
 */
const randomSGID = () => {
  const firstChars = ['S', 'T', 'F', 'G', 'M'];
  const randomFirstChar = firstChars[randomInt(0, firstChars.length - 1)];

  const digits = Array.from({ length: 7 }, () => randomInt(1, 10)).join('');

  const checksum = calculateChecksum(randomFirstChar, digits);

  console.log(`${randomFirstChar}${digits}${checksum}`);

  return copy(`${randomFirstChar}${digits}${checksum}`);
};

export default randomSGID;
