const { calculateNextOccurence } = require("../utils/helper");
const calculateNextOccurence =
  require("../utils/helper").calculateNextOccurence;
const TransactionModel = require("../models/transaction.model");

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

module.exports = {
  createTransactionService,
  getAllTransactionsService,
};
