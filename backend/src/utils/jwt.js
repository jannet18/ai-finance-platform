const jwt = require("jsonwebtoken");
const Env = require("../config/envConfig");

const defaults = {
  audience: ["user"],
};

const accessTokenSignOptions = {
  expiresIn: Env.JWT_EXPIRES_IN,
  secret: Env.JWT_SECRET,
};

function signJwtToken() {
  const isAccessToken =
    !options ||
    (options.expiresIn === accessTokenSignOptions &&
      options.secret === accessTokenSignOptions.secret);

  const { secret, ...rest } = opts;

  const token = jwt.sign(payload, secret, {
    ...defaults,
    ...rest,
  });

  let expiresAt;
  if (isAccessToken) {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      expiresAt = decoded.exp * 1000;
    }
  }

  return {
    token,
    expiresAt,
  };
}

module.exports = { signJwtToken };
