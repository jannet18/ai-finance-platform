const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds = 10) => {
  if (!password) {
    throw new Error("Password is required.");
  }

  if (typeof password !== "string") {
    throw new Error("Password must be a string.");
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

const compareValue = async (candidateValue, hashedValue) => {
  if (!candidateValue || !hashedValue) {
    throw new Error("Both candidate value and hashed value are required.");
  }
  try {
    const isValid = await bcrypt.compare(candidateValue, hashedValue);
    return isValid;
  } catch (error) {
    throw new Error("Error comparing values: " + error.message);
  }
  return await bcrypt.compare(candidateValue, hashedValue);
};

module.exports = { compareValue, hashPassword };
