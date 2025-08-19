const { passportAuthenticateJwt } = require("../config/passport.config");
const {
  createTransaction,
  getAllTransactions,
} = require("../controllers/transaction.controller");

const Router = require("express").Router;

const transactionRoutes = Router();

transactionRoutes.post("/create", passportAuthenticateJwt, createTransaction);
transactionRoutes.get("/all", passportAuthenticateJwt, getAllTransactions);

module.exports = transactionRoutes;
