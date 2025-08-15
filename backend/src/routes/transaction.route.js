const { createTransaction } = require("../controllers/transaction.controller");

const Router = require("express").Router;

const transactionRoutes = Router();

transactionRoutes.post("/create", createTransaction);
