const getEnv = (key, defaultValue) => {
  const value = process.env[key];

  if (value !== undefined && value !== "") {
    return value;
  }
  if (defaultValue === undefined) {
    throw new Error(
      `Environment variable ${key} is not set and no default value provided.`
    );
  }

  return defaultValue;
};

module.exports = { getEnv };
