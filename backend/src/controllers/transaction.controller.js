const { get } = require("mongoose");
const { HTTPSTATUS } = require("../config/httpConfig");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const {
  getAllTransactionsService,
  createTransactionService,
  getTransactionByIdService,
} = require("../services/transaction.service");
const { transactionSchema } = require("../validators/transaction.validator");

const createTransaction = asyncHandler(async (req, res) => {
  const body = await transactionSchema.safeParse(req.body);
  const userId = req.user._id;

  await createTransactionService({
    ...body.data,
    userId,
  });
  // Assuming user ID is available in the request context
  return res.status(HTTPSTATUS.CREATED).json({
    message: "Transaction created successfully",
    data: req.body,
  });
});

const getAllTransactions = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const filters = {
    keyword: req.query.keyword,
    type: req.query.type,
    recurringStatus: req.query.recurringStatus,
  };

  const pagination = {
    pageSize: parseInt(req.query.pageSize, 10) || 10,
    pageNumber: parseInt(req.query.pageNumber, 10) || 1,
  };
  const result = await getAllTransactionsService(userId, filters, pagination);
  return res.status(HTTPSTATUS.OK).json({
    message: "Transactions fetched successfully",
    // data: transactions,
    ...result,
  });
});

const getTransactionById = asyncHandler(async (req, res) => {
  const transactionId = transactionSchema.safeParse(req.params.id);
  const userId = req.user?._id;

  const transaction = await getTransactionByIdService(transactionId, userId);
  if (!transaction) {
    return res.status(HTTPSTATUS.NOT_FOUND).json({
      message: "Transaction not found",
    });
  }

  return res.status(HTTPSTATUS.OK).json({
    message: "Transaction fetched successfully",
    data: transaction,
  });
});
module.exports = { createTransaction, getAllTransactions, getTransactionById };
