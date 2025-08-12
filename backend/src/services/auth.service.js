const ReportSettingModel = require("../models/report.setting.model");
const UserModel = require("../models/user.model");
const {
  NotfoundException,
  UnauthorizedException,
} = require("../utils/app-error");
const { calculateNextReportDate } = require("../utils/helper");
const { signJwtToken } = require("../utils/jwt");

const registerService = async (body) => {
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

const loginService = async (body) => {
  const { email, password } = body;

  const user = await UserModel.findOne({ email });
  if (!user) throw new NotfoundException("User not found.");

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new UnauthorizedException("Invalid Credentials");
  }

  const { token, expiresAt } = signJwtToken({ userId: user.id });

  const reportSetting = await ReportSettingModel.findOne(
    { userId: user._id },
    {
      _id: 1,
      frequency: 1,
      isEnabled: 1,
    }
  ).lean();

  const safeUser = user.omitPassword();
  return {
    user: safeUser,
    accessToken: token,
    expiresAt,
    reportSetting,
  };
};

module.exports = { registerService, loginService };
