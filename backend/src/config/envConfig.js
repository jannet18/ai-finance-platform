import { getEnv } from "../utils/getEnv";

const envConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", 8000),
  MONGO_URI: getEnv("MONGO_URI", ""),
  JWT_SECRET: getEnv("JWT_SECRET", ""),
  JWT_EXPIRATION: getEnv("JWT_EXPIRATION", "1d"),
  JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET", ""),
  JWT_REFRESH_EXPIRATION: getEnv("JWT_REFRESH_EXPIRATION", "7d  "),
  GEMINI_API_KEY: getEnv("GEMINI_API_KEY", ""),
  FRONTEND_URL: getEnv("FRONTEND_URL", ""),
});

export const Env = envConfig();
