import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const compareValue = async (candidateValue, hashedValue) => {
  return await bcrypt.compare(candidateValue, hashedValue);
};
