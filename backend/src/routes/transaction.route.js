const { passportAuthenticateJwt } = require("../config/passport.config");
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  duplicateTransaction,
  updateTransaction,
  deleteTransaction,
  bulkDeleteTransaction,
  bulkTransaction,
  scanReceipt,
} = require("../controllers/transaction.controller");
const { upload } = require("../config/cloudinaryConfig");

const Router = require("express").Router;

const transactionRoutes = Router();

transactionRoutes.post("/create", passportAuthenticateJwt, createTransaction);
transactionRoutes.get("/all", passportAuthenticateJwt, getAllTransactions);
transactionRoutes.get("/:id", passportAuthenticateJwt, getTransactionById);
transactionRoutes.put(
  "/duplicate/:id",
  passportAuthenticateJwt,
  duplicateTransaction
);
transactionRoutes.put(
  "/update/:id",
  passportAuthenticateJwt,
  updateTransaction
);
transactionRoutes.delete(
  "/delete/:id",
  passportAuthenticateJwt,
  deleteTransaction
);

transactionRoutes.delete(
  "/bulk-delete",
  passportAuthenticateJwt,
  bulkDeleteTransaction
);
transactionRoutes.post(
  "/bulk-transaction",
  passportAuthenticateJwt,
  bulkTransaction
);

transactionRoutes.post(
  "/scan-receipt",
  passportAuthenticateJwt,
  upload.single("receipt"),
  scanReceipt
);
module.exports = transactionRoutes;
