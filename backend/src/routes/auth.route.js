const { Router } = require("express");
const { registerUser } = require("../controllers/auth.controller.js");

const authRoutes = Router();

authRoutes.post("/register", registerUser);

module.exports = { authRoutes };
