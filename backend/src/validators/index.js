import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Env } from "../config/envConfig";
import { HTTPSTATUS } from "../config/httpConfig";
import { ErrorHandler } from "../middlewares/errorHandler.middleware";
import { BadRequestException } from "../utils/app-error";
import { asyncHandler } from "../middlewares/asyncHandler.middleare";
import connectDB from "../config/databaseConfig";
dotenv.config();

const app = express();
const BASE_PATH = Env.BASE_PATH || "api/v1";
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: Env.FRONTEND_URL,
    credentials: true,
  })
);

app.get(
  "/",
  asyncHandler(async (req, res) => {
    throw new BadRequestException(
      "This is a test error for the async handler."
    );
  })
);

res.status(HTTPSTATUS.OK).json({
  message: "Welcome to the FinGrowth API",
  version: "1.0.0",
  basePath: BASE_PATH,
});

app.use(ErrorHandler);
app.listen(Env.PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${Env.PORT} in {Env.NODE_ENV} mode.`);
});
