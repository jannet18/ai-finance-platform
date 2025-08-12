const { z } = require("zod");

const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address")
  .min()
  .max(255);

const passwordSchema = z.string().trim().min(6);

const registerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  passwordSchema: passwordSchema,
});

module.exports = { registerSchema, loginSchema };
