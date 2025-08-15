const { getEnv } = require("../utils/getEnv");

const envConfig = () => {
  // console.log("Loading environment configuration...");
  return {
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", 8000),
    MONGO_URI: getEnv("MONGO_URI", ""),
    JWT_SECRET: getEnv("JWT_SECRET", ""),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1d"),
    JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET", ""),
    JWT_REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRATION", "7d"),
    GEMINI_API_KEY: getEnv("GEMINI_API_KEY", ""),
    FRONTEND_URL: getEnv("FRONTEND_URL", ""),
    BASE_PATH: getEnv("BASE_PATH", "api/v1"),
  };
};

const Env = envConfig();
module.exports = { Env };
