const { mongoose } = require("mongoose");
const { calculateNextOccurence } = require("../utils/helper");
const calculateNextOccurence =
  require("../utils/helper").calculateNextOccurence;

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

module.exports = {
  createTransactionService,
};
