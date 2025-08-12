const { ZodError } = require("zod");
const { HTTPSTATUS } = require("../config/httpConfig");
const { ErrorCodeEnum } = require("../enums/errorCodeEnum");

const formatZodError = (res, err) => {
  const errors = err?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return formatZodError(res, err);
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: res.message || "An error occurred",
      error: {
        code: err.code || "INTERNAL_SERVER_ERROR",
        details: err.details || null,
      },
    });
  }
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).JSON({
    message: "Internal Server Error",
    error: err.message || "An unexpected error occurred.",
  });
};

module.exports = ErrorHandler;
