const { UserModel } = require("../models/user.model");
const { NotfoundException } = require("../utils/app-error");

const findByIdUserService = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotfoundException("User not found");
  }
  return user?.omitPassword();
};

module.exports = { findByIdUserService };
