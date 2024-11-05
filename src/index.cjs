const { randomHKID, isValidHKID } = require('./hkid/index.js');
const { randomSGID, isValidSGID } = require('./sgid/index.js');

module.exports = {
  randomHKID,
  isValidHKID,
  randomSGID,
  isValidSGID,
};
