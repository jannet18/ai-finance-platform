const { passportAuthenticateJwt } = require("../config/passport.config");
const { createTransaction } = require("../controllers/transaction.controller");

const Router = require("express").Router;

const transactionRoutes = Router();

transactionRoutes.post("/create", passportAuthenticateJwt, createTransaction);

module.exports = transactionRoutes;
