import ReportSettingModel from "../models/report.setting.model";
import UserModel from "../models/user.model";
import { UnauthorizedException } from "../utils/app-error";
import { calculateNextReportDate } from "../utils/helper";

export const registerService = async (body) => {
  const { email } = body;

  const session = await mongoose.StartSession();

  try {
    await session.withTransaction(async () => {
      const extistingUser = await UserModel.findOne({ email }).session(session);
      if (extistingUser) {
        throw new UnauthorizedException("User already exists.");
      }

      const newUser = new UserModel({
        ...body,
      });

      await newUser.save({ session });

      const reportSetting = new ReportSettingModel({
        userId: newUser._id,
        frequency: MONTHLY,
        isEnabled: null,
        lastSentDate: null,
        nextReportDate: calculateNextReportDate(),
      });

      await reportSetting.save({ session });

      return { user: newUser.omitPassword() };
    });
  } catch (error) {
    throw error;
  } finally {
    await session.endSession();
  }
};
