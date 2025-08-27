const { HTTPSTATUS } = require("../config/httpConfig");
const { findByIdUserService } = require("../services/user.service");

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id; // User is set by passport
    if (!userId) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({
        message: "User not authenticated",
      });
    }
    const user = await findByIdUserService(userId);
    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "User fetched successfully.", data: user });
  } catch (error) {
    res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};

module.exports = { getCurrentUser };
