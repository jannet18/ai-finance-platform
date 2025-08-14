const { z } = require("zod");

const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address")
  .min(1, "Email is required")
  .max(255, "Email is too long");

const passwordSchema = z
  .string()
  .trim()
  .min(6, "Password must be at least 6 characters")
  .max(255, "Password is too long");

const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(255, "Full name is too long"),
  email: emailSchema,
  password: passwordSchema,
  profilePicture: z.string().url().optional(),
});

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

module.exports = { registerSchema, loginSchema, emailSchema, passwordSchema };
