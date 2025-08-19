const { calculateNextOccurence } = require("../utils/helper");
const calculateNextOccurence =
  require("../utils/helper").calculateNextOccurence;
const TransactionModel = require("../models/transaction.model");
const { NotfoundException } = require("../utils/app-error");
const { is } = require("zod/v4/locales");
const { use } = require("passport");
const { success } = require("zod");

const createTransactionService = async (body, userId) => {
  let nextRecurringDate = null;
  const currentDate = new Date();
  if (body.isRecurring && body.recurringInterval) {
    const calculateDate = calculateNextOccurence(
      body.date,
      body.recurringInterval
    );
    nextRecurringDate =
      calculateDate > currentDate
        ? calculateNextOccurence(currentDate, body.recurringInterval)
        : calculateDate;
  }

  const transaction = await TransactionModel.create({
    ...body,
    userId,
    category: body.category,
    amount: Number(body.amount),
    isRecurring: body.isRecurring || false,
    recurringInterval: body.recurringInterval || null,
    nextRecurringDate,
    lastProcessed: body.lastProcessed || null,
    status: body.status || "COMPLETED",
    paymentMethod: body.paymentMethod || null,
  });

  return transaction.save();
};

const getAllTransactionsService = async (userId, filters, pagination) => {
  const { keyword, type, recurringStatus } = filters;

  const filterConditions = { userId };
  if (keyword) {
    filterConditions.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ];
  }
  if (type) {
    filterConditions.type = type;
  }
  if (recurringStatus) {
    recurringStatus === "RECURRING";
    filterConditions.isRecurring = true;
  } else if (recurringStatus === "NON_RECURRING") {
    filterConditions.isRecurring = false;
  }

  const { pageSize, pageNumber } = pagination;

  if (pageSize <= 0 || pageNumber <= 0) {
    throw new Error("Invalid pagination parameters");
  }
  const skip = (pageNumber - 1) * pageSize;

  const transactions = await TransactionModel.find(filterConditions)
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 });
  const totalcount = TransactionModel.countDocuments(filterConditions);
  const totalPages = Math.ceil(totalcount / pageSize);

  return {
    transactions,
    pagination: { pageSize, pageNumber, totalcount, totalPages, skip },
  };
};

const getTransactionByIdService = async (transactionId, userId) => {
  const transaction = await TransactionModel.findOne({
    _id: transactionId,
    userId,
  });

  if (!transaction) {
    throw new NotfoundException("Transaction not found");
  }
  return transaction;
};

const duplicateTransactionService = async (transactionId, userId) => {
  const transaction = await TransactionModel.findOne({
    _id: transactionId,
    userId,
  });
  if (!transaction) {
    throw new NotfoundException("Transaction not found");
  }

  const duplicated = await TransactionModel.create({
    ...transaction.toObject(),
    _id: undefined, // Ensure a new ID is created
    title: `Duplicate of ${transaction.title}`,
    description: `Duplicated on ${new Date().toLocaleDateString()}`,
    isRecurring: false,
    recurringInterval: undefined,
    nextRecurringDate: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    userId,
    // date: new Date(), // Set the date to now for the duplicated transaction
  });
  return duplicated.save();
};

const updateTransactionService = async (transactionId, userId, body) => {
  const existingTransaction = await TransactionModel.findOne({
    _id: transactionId,
    userId,
  });

  if (!existingTransaction) {
    throw new NotfoundException("Transaction not found");
  }
  const now = new Date();
  const isRecurring = body.isRecurring ?? existingTransaction.isRecurring;
  const recurringInterval =
    body.recurringInterval ?? existingTransaction.recurringInterval;
  const date =
    body.date !== undefined ? new Date(body.date) : existingTransaction.date;

  let nextRecurringDate;

  if (isRecurring && recurringInterval) {
    const calculateDate = calculateNextOccurence(date, recurringInterval);
    nextRecurringDate =
      calculateDate < now
        ? calculateNextOccurence(now, recurringInterval)
        : calculateDate;
  }

  existingTransaction.set({
    ...(body.title && { title: body.title }),
    ...(body.description && { description: body.description }),
    ...(body.category && { category: body.category }),
    ...(body.type && { type: body.type }),
    ...(body.paymentMethod && { paymentMethod: body.paymentMethod }),
    ...(body.amount !== undefined && { amount: Number(body.amount) }),
    date,
    isRecurring,
    recurringInterval,
    nextRecurringDate,
  });

  await existingTransaction.save();

  return;
};

const deleteTransactionService = async (transactionId, userId) => {
  const deleteTransaction = await TransactionModel.findOneAndDelete({
    _id: transactionId,
    userId,
  });
  if (!deleteTransaction) {
    throw new NotfoundException("Transaction not found");
  }
  return;
};

const bulkDeleteTransactionService = async (transactionIds, userId) => {
  const result = await TransactionModel.deleteMany({
    _id: { $in: transactionIds },
    userId,
  });
  if (result.deletedCount === 0) {
    throw new NotfoundException("No transactions found for deletion");
  }
  return {
    deletedCount: result.deletedCount,
    message: `${result.deletedCount} transactions deleted successfully`,
  };
};

const bulkTransactionService = async (userId, transactions) => {
  if (!transactions || transactions.length === 0) {
    throw new Error("At least one transaction is required");
  }
  try {
    const bulkOps = transactions.map((transaction) => ({
      insertOne: {
        document: {
          ...transaction,
          userId,
          isRecurring: false,
          nextRecurringDate: null,
          recurringInterval: null,
          lastProcessed: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    }));
    const bulkResult = await TransactionModel.bulkWrite(bulkOps, {
      ordered: true,
    });

    return {
      insertedCount: bulkResult.insertedCount,
      success: true,
      message: `${bulkResult.insertedCount} transactions created successfully`,
    };
  } catch (error) {
    throw new Error(`Bulk transaction creation failed: ${error.message}`);
  }
};

module.exports = {
  createTransactionService,
  getAllTransactionsService,
  getTransactionByIdService,
  duplicateTransactionService,
  updateTransactionService,
  deleteTransactionService,
  bulkDeleteTransactionService,
};
