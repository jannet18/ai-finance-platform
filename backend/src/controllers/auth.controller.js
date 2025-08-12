const { HTTPSTATUS } = require("../config/httpConfig");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { registerService } = require("../services/auth.service");
const { loginSchema, registerSchema } = require("../validators/auth.validator");

const registerUser = asyncHandler(async (req, res) => {
  const body = registerSchema.parse(req.body);

  const result = await registerService(body);
  return res
    .status(HTTPSTATUS.CREATED)
    .json({ message: "User registered successfully", data: result });
});

const loginUser = asyncHandler(async (req, res) => {
  const body = loginSchema.parse(req.body);

  const { user, accessToken, expiresAt, reportSetting } =
    await loginService(body);

  return res.status(HTTPSTATUS.OK).json({
    message: "User Logged in successfully",
    user,
    accessToken,
    expiresAt,
    reportSetting,
  });
});

module.exports = { registerUser, loginUser };
