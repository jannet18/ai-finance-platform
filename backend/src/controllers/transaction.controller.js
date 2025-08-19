const { get } = require("mongoose");
const { HTTPSTATUS } = require("../config/httpConfig");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const {
  getAllTransactionsService,
  createTransactionService,
  getTransactionByIdService,
  duplicateTransactionService,
  deleteTransactionService,
  bulkDeleteTransactionService,
  updateTransactionService,
} = require("../services/transaction.service");
const {
  transactionSchema,
  bulkDeleteTransactionSchema,
  bulkTransactionSchema,
} = require("../validators/transaction.validator");
const { de } = require("zod/v4/locales");
const updateTransactionSchema =
  require("../validators/transaction.validator").updateTranscationSchema;

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

const duplicateTransaction = asyncHandler(async (req, res) => {
  const transactionId = transactionSchema.safeParse(req.params.id);
  const userId = req.user?._id;

  const transaction = await duplicateTransactionService(transactionId, userId);
  if (!transaction) {
    return res.status(HTTPSTATUS.NOT_FOUND).json({
      message: "Transaction not found",
    });
  }
  return res.status(HTTPSTATUS.OK).json({
    message: "Transaction duplicated successfully",
    data: transaction,
  });
});

const updateTransaction = asyncHandler(async (req, res) => {
  const transactionId = transactionSchema.safeParse(req.params.id);
  const userId = req.user?._id;

  const body = updateTransactionSchema.safeParse(req.body);

  const updatedTransaction = await updateTransactionService(
    transactionId,
    userId,
    body.data
  );
  return res.status(HTTPSTATUS.OK).json({
    message: "Transaction updated successfully",
    data: updatedTransaction.data,
  });
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const transactionId = transactionSchema.safeParse(req.params.id);
  const userId = req.user?._id;

  await deleteTransactionService(transactionId, userId);
  return res.status(HTTPSTATUS.OK).json({
    message: "Transaction deleted successfully",
  });
});

const bulkDeleteTransaction = asyncHandler(async (req, res) => {
  const { transactionIds } = bulkDeleteTransactionSchema(req.body);
  const userId = req.user?._id;

  const results = await bulkDeleteTransactionService(transactionIds, userId);
  return res.status(HTTPSTATUS.OK).json({
    message: "Transactions deleted successfully",
    ...results,
  });
});

const bulkTransaction = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { transactions } = bulkTransactionSchema.safeParse(req.body);
  const bulkResultList = await bulkDeleteTransactionService(
    userId,
    transactions
  );

  return res.status(HTTPSTATUS.OK).json({
    message: "Bulk transctions inserted successfully",
    ...bulkResultList,
  });
});
module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  duplicateTransaction,
  updateTransaction,
  deleteTransaction,
  bulkDeleteTransaction,
  bulkTransaction,
};
