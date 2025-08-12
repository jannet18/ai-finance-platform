const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const compareValue = async (candidateValue, hashedValue) => {
  return await bcrypt.compare(candidateValue, hashedValue);
};

module.exports = { compareValue, hashPassword };
