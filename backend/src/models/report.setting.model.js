import mongoose from "mongoose";

const reportSettingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    frequency: {
      type: String,
      enum: ["MONTHLY"],
      default: MONTHLY,
    },
    isEnabled: {
      type: Boolean,
      default: false,
    },
    nextReportDate: {
      type: Date,
    },
    lastSentDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const ReportSettingModel = mongoose.model(
  "Report Setting",
  reportSettingSchema
);
export default ReportSettingModel;
