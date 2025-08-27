const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const { Env } = require("./envConfig");
const passport = require("passport");
const { findByIdUserService } = require("../services/user.service");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Env.JWT_SECRET,
  audience: "user",
  algorithms: ["HS256"],
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      console.log("Decoded JWT payload:", jwtPayload);
      if (!jwtPayload?.userId) {
        return done(null, false, { message: "Invalid token payload" });
      }
      const user = await findByIdUserService(jwtPayload?.userId);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      return done(null, user);
    } catch (error) {
      console.error("Error inside JwtStrategy:", error);
      return done(error, false);
    }
  })
);

// passport.serializeUser((user, done) => done(null, user._id));
// passport.deserializeUser(async (id, done) =>
//   done(null, await findByIdUserService(id))
// );
const passportAuthenticateJwt = passport.authenticate("jwt", {
  session: false,
});

module.exports = { passport, passportAuthenticateJwt };
