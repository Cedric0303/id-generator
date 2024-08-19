import { randomInt } from 'crypto';
import { copy } from 'copy-paste';

/**
 * Calculate check digit
 * @param {string}  charPart - Alphabet in HKID
 * @param {string}  numPart - First 6 numerber in HKID
 * @returns  {(number|string)}
 */
const calculateCheckDigit = (charPart, numPart) => {
  // Maximum alphabet should be 2
  // 6 number for a valid HKID
  if (charPart.length > 3 || numPart.length !== 6) {
    return false;
  }

  // Calculate checksum for character part
  const strValidChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let checkSum = 0;
  if (charPart.length === 2) {
    checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
    checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
  } else {
    checkSum += 9 * 36;
    checkSum += 8 * (10 + strValidChars.indexOf(charPart));
  }

  // Calculate checksum for numeric part
  for (let i = 0, j = 7; i < numPart.length; i += 1, j -= 1) {
    checkSum += j * Number(numPart.charAt(i));
  }

  // Verify the check digit
  const remaining = checkSum % 11;
  // eslint-disable-next-line no-nested-ternary
  const verify = remaining === 0 ? 0 : (11 - remaining === 10 ? 'A' : 11 - remaining);

  return verify;
};

/**
 * Generate random HKID
 * @returns  {string}
 */
const randomHKID = () => {
  // Generate a random number between 1 - 10
  const hkidMode = randomInt(1, 11);

  // Generate A - Z from ASCII code 65 - 90
  const randomAlphabet = (hkidMode === 10) ? String.fromCharCode(randomInt(65, 90)) + String.fromCharCode(randomInt(65, 90)) : String.fromCharCode(randomInt(65, 90));

  // Generate 6 Number
  const randomNumber = Array.from({ length: 6 }, () => randomInt(0, 10)).join('');

  // Calculate check digit
  const checkdigit = calculateCheckDigit(randomAlphabet, randomNumber);

  return copy(`${randomAlphabet}${randomNumber}${checkdigit}`);
};

export default randomHKID;
