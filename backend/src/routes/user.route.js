const { Router } = require("express");
const { getCurrentUser } = require("../controllers/user.controller");
const { passportAuthenticateJwt } = require("../config/passport.config");
const userRoutes = Router();

userRoutes.get("/current-user", passportAuthenticateJwt, getCurrentUser);

module.exports = userRoutes;
