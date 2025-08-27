const { HTTPSTATUS } = require("../config/httpConfig");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { registerService, loginService } = require("../services/auth.service");
const { loginSchema, registerSchema } = require("../validators/auth.validator");

const registerUser = asyncHandler(async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("Request body is empty or undefined");
  }
  const body = registerSchema.safeParse(req.body);
  if (!body.success) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Validation failed",
      error: body.error?.errors,
      receivedData: req.body,
    });
  }

  const result = await registerService(body?.data);
  return res
    .status(HTTPSTATUS.CREATED)
    .json({ message: "User registered successfully", data: result });
});

const loginUser = asyncHandler(async (req, res) => {
  const body = loginSchema.safeParse(req.body);
  if (!body.success) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Validation failed",
      error: body.error?.errors,
      receivedData: req.body,
    });
  }

  const { user, accessToken, expiresAt, reportSetting } = await loginService(
    body.data
  );

  return res.status(HTTPSTATUS.OK).json({
    message: "User Logged in successfully",
    user,
    accessToken,
    expiresAt,
    reportSetting,
  });
});

module.exports = { registerUser, loginUser };
