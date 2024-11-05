import hkid from './hkid/index.js';
import sgid from './sgid/index.js';

const { randomHKID, isValidHKID } = hkid;
const { randomSGID, isValidSGID } = sgid;

export {
  randomHKID,
  isValidHKID,
  randomSGID,
  isValidSGID,
};
