const mongoose = require("mongoose");

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
      enum: ["income", "expense"],
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
      enum: ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"],
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
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: COMPLETED,
    },
    paymentMethod: {
      type: String,
      enum: [
        "CARD",
        "BANK_TRANSFER",
        "MOBILE_PAYMENT",
        "AUTO_DEBIT",
        "CASH",
        "OTHER",
      ],
      default: CASH,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

const TransactionModel = mongoose.model("Transaction", transactionSchema);
export default TransactionModel;
