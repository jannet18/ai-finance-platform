const mongoose = require("mongoose");

const TRANSACTION_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};

const TRANSACTION_TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
};

const RECURRING_INTERVAL = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
};

const PAYMENT_METHOD = {
  CARD: "CARD",
  BANK_TRANSFER: "BANK_TRANSFER",
  MOBILE_PAYMENT: "MOBILE_PAYMENT",
  AUTO_DEBIT: "AUTO_DEBIT",
  CASH: "CASH",
  OTHER: "OTHER",
};

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(TRANSACTION_TYPE),
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      set: (v) => Math.round(v * 100) / 100,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    receiptUrl: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurringInterval: {
      type: String,
      enum: Object.values(RECURRING_INTERVAL),
      default: null,
    },
    nextRecurringDate: {
      type: Date,
    },
    lastProcessed: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(TRANSACTION_STATUS),
      default: TRANSACTION_STATUS.COMPLETED,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHOD),
      default: PAYMENT_METHOD.CASH,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

const TransactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = {
  TransactionModel,
  PAYMENT_METHOD,
  TRANSACTION_TYPE,
  TRANSACTION_STATUS,
  RECURRING_INTERVAL,
};
