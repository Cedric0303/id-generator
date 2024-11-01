import { randomInt } from 'crypto';
import { copy } from 'copy-paste';

/**
 * Get the checksum table based on the first character
 * @returns {Array<string>}
 */
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
 * @returns {(number|string)}
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

const isCorrectFormat = (string) => /^[STFGM]\d{7}[A-Z]$/.test(string);

/**
 * Check if a given string is a valid HKID
 * @param {string}  string - Input string
 * @returns {boolean}
 */
const isValidSGID = (string) => {
  // check format
  if (!isCorrectFormat(string)) return false;

  const firstChar = string.slice(0, 1) || null;
  const digits = string.slice(1, -1) || null;
  const checksum = string.slice(-1) || null;

  return checksum === calculateChecksum(firstChar, digits);
};

/**
 * Generate a random SGID
 * @returns {Promise<string>}
 */
const randomSGID = async (inputFirstChar = '') => {
  const firstChars = ['S', 'T', 'F', 'G', 'M'];
  const randomFirstChar = firstChars.includes(inputFirstChar.toUpperCase()) ? inputFirstChar.toUpperCase() : firstChars[randomInt(0, firstChars.length)];

  const digits = Array.from({ length: 7 }, () => randomInt(0, 10)).join('');

  const checksum = calculateChecksum(randomFirstChar, digits);

  let sgidStr = `${randomFirstChar}${digits}${checksum}`;

  if (!isValidSGID(sgidStr)) sgidStr = randomSGID(inputFirstChar);

  return copy(sgidStr);
};

export {
  randomSGID,
  isValidSGID,
};
