const { HTTPSTATUS } = require("../config/httpConfig");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { registerService } = require("../services/auth.service");
const { loginSchema, registerSchema } = require("../validators/auth.validator");

const registerUser = asyncHandler(async (req, res) => {
  console.log("=== VALIDATION DEBUG ===");
  console.log("Raw request body:", req.body);
  console.log("Request headers:", req.headers);
  console.log("Content-Type header:", req.headers["content-type"]);
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

  const result = await registerService(body.data);
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
