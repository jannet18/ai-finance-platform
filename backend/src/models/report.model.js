const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    period: {
      String,
      required: true,
    },
    sentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      emun: ["SENT", "PENDING", "FAILED"],
      default: PENDING,
    },
  },
  { timestamps: true }
);

const ReceiptModel = mongoose.model("Receipts", receiptSchema);
export default ReceiptModel;
