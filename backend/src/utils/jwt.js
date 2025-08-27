const jwt = require("jsonwebtoken");
const { Env } = require("../config/envConfig");

// const defaults = {
//   audience: ["user"],
// };

// const accessTokenSignOptions = {
//   expiresIn: Env.JWT_EXPIRES_IN || "1h",
//   secret: Env.JWT_SECRET,
// };

// function signJwtToken(payload, options ={}, opts = {}) {
//   const isAccessToken =
//     !options ||
//     (options.expiresIn === accessTokenSignOptions &&
//       options.secret === accessTokenSignOptions.secret);

//   const { secret, ...rest } = opts;

//   const token = jwt.sign(payload, secret, {
//     ...defaults,
//     ...rest,
//   });

//   let expiresAt;
//   if (isAccessToken) {
//     const decoded = jwt.decode(token);
//     if (decoded && decoded.exp) {
//       expiresAt = decoded.exp * 1000;
//     }
//   }

//   return {
//     token,
//     expiresAt,
//   };
// }

function signJwtToken(userId) {
  const payload = { userId };
  const secret = Env.JWT_SECRET;
  const options = {
    expiresIn: Env.JWT_EXPIRES_IN || "1h",
    audience: "user",
  };

  const token = jwt.sign(payload, secret, options);
  const decoded = jwt.decode(token);
  const expiresAt = decoded && decoded.exp ? decoded.exp * 1000 : null;

  return {
    token,
    expiresAt,
  };
}

module.exports = { signJwtToken };
