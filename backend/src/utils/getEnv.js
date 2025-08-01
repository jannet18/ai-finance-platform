export const getEnv = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(
        `Environment variable ${key} is not set and no default value provided.`
      );
    }
    return defaultValue;
  }
  return value;
};
