const { passportAuthenticateJwt } = require("../config/passport.config");
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
} = require("../controllers/transaction.controller");

const Router = require("express").Router;

const transactionRoutes = Router();

transactionRoutes.post("/create", passportAuthenticateJwt, createTransaction);
transactionRoutes.get("/all", passportAuthenticateJwt, getAllTransactions);

transactionRoutes.get("/:id", passportAuthenticateJwt, getTransactionById);
module.exports = transactionRoutes;
