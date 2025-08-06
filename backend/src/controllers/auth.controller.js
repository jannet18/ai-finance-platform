import { HTTPSTATUS } from "../config/httpConfig";
import { registerService } from "../services/auth.service";
import { registerSchema } from "../validators/auth.validator";

export const registerUser = asyncHandler(async (req, res) => {
  const body = registerSchema.parse(req.body);

  const result = await registerService(body);
  return res
    .status(HTTPSTATUS.CREATED)
    .json({ message: "User registered successfully", data: result });
});
