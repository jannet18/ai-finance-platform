const express = require("express");
const { Router } = require("express");
const { registerUser } = require("../controllers/auth.controller");

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);

module.exports = authRoutes;
