import { randomInt } from 'crypto';
import { copy } from 'copy-paste';

/**
 * Calculate check digit
 * @param {string}  charPart - Alphabet in HKID
 * @param {string}  numPart - First 6 numerber in HKID
 * @returns {(number|string)}
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

const formatHKID = (str) => str.replace(/[()]/g, '').toUpperCase();

/**
 * Check if HKID contains 1 or 2 alphabet, 6 number and
 * 1 check digit and return them in 4 parts: [full hkid, char, num, check digit]
 * @param {string}  str - Full HKID number
 * @returns {(array|null)}
 */
const processHKID = (string) => {
  // Remove brackets before spliting
  const formattedStr = formatHKID(string);
  const hkidRegex = /^([a-zA-Z]{1,2})([0-9]{6})([aA0-9])$/;
  return formattedStr.toUpperCase().match(hkidRegex);
};

/**
 * Check if a given string is a valid HKID
 * @param {string}  string - Input string
 * @returns {boolean}
 */
const isValidHKID = (string) => {
  if (!string) return false;

  // Remove brackets and convert HKID to uppercase
  const uppercaseStr = formatHKID(string);

  // HKID length must be 8 or 9
  if (uppercaseStr.length < 8 || uppercaseStr.length > 9) return false;

  // Check if HKID contains 1 or 2 alphabet, 6 number and 1 check digit
  // const hkidRegex = new RegExp(/^([a-zA-Z]{1,2})([0-9]{6})([aA0-9])$/);
  const matchArray = processHKID(uppercaseStr);

  if (!matchArray) return false;

  // Calculate check digit
  const verify = calculateCheckDigit(matchArray[1], matchArray[2]);

  return verify.toString() === matchArray[3].toString();
};

/**
 * Generate random HKID
 * @returns {Promise<string>}
 */
const randomHKID = async (disableCopyToClipboard = false) => {
  // Generate a random number between 1 - 10
  const hkidMode = randomInt(1, 11);

  // Generate A - Z from ASCII code 65 - 90
  const randomAlphabet = (hkidMode === 10) ? String.fromCharCode(randomInt(65, 91)) + String.fromCharCode(randomInt(65, 91)) : String.fromCharCode(randomInt(65, 91));
  // const randomAlphabet = (hkidMode === 10) ? String.fromCharCode(randomInt(65, 91)) + String.fromCharCode(randomInt(65, 91)) : String.fromCharCode(randomInt(65, 91));

  // Generate 6 Number
  const randomNumber = Array.from({ length: 6 }, () => randomInt(0, 10)).join('');

  // Calculate check digit
  const checkdigit = calculateCheckDigit(randomAlphabet, randomNumber);

  let hkidStr = `${randomAlphabet}${randomNumber}${checkdigit}`;

  if (!isValidHKID(hkidStr)) hkidStr = await randomHKID();

  return (disableCopyToClipboard) ? hkidStr : copy(hkidStr);
};

export {
  randomHKID,
  isValidHKID,
};
