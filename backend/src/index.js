require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Env } = require("./config/envConfig");
const { HTTPSTATUS } = require("./config/httpConfig");
const connectDB = require("./config/databaseConfig");
const asyncHandler = require("./middlewares/asyncHandler.middleware");
const authRoutes = require("./routes/auth.route");
const ErrorHandler = require("./middlewares/errorHandler.middleware");
const { BadRequestException } = require("./utils/app-error");
const passport = require("passport");
const userRoutes = require("./routes/user.route");
const transactionRoutes = require("./routes/transaction.route");

const app = express();
const BASE_PATH = Env.BASE_PATH || "/api/v1";
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
// app.use(
//   cors({
//     origin: Env.FRONTEND_URL,
//     credentials: true,
//   })
// );

app.get(
  "/",
  asyncHandler(async (req, res) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Welcome to the FinGrowth API",
      version: "1.0.0",
      basePath: BASE_PATH,
    });
    throw new BadRequestException("This is a test error");
  })
);

app.use(`/${BASE_PATH}/auth`, authRoutes);
app.use(`/${BASE_PATH}/user`, userRoutes);
app.use(`/${BASE_PATH}/transactions`, transactionRoutes);
app.use(ErrorHandler);

app._router?.stack.forEach((middleware) => {
  if (middleware.route) {
    // Routes registered directly on the app
    console.log(
      `${Object.keys(middleware.route.methods)} ${middleware.route.path}`
    );
  } else if (middleware.name === "router") {
    // Routes added via router
    const basePath = middleware.regexp.source
      .replace("\\", "")
      .replace(/\$.*/, "")
      .replace(/\?\(\?\=.*/, "");
    middleware.handle.stack.forEach((handler) => {
      const route = handler.route;
      if (route) {
        console.log(
          `${Object.keys(route.methods)} ${basePath} -> ${route.path}`
        );
      }
    });
  }
});

app.listen(Env.PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode.`);
});
