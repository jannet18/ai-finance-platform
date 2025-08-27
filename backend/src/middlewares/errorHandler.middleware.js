const { ZodError } = require("zod");
const { HTTPSTATUS } = require("../config/httpConfig");
const { ErrorCodeEnum } = require("../enums/errorCodeEnum");
const { AppError } = require("../utils/app-error");
const { MulterError } = require("multer");

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

const handleMulterError = (res, err) => {
  const messages = {
    LIMIT_UNEXPECTED_FILE: "Invalid file field name. Please try use 'file' ",
    LIMIT_FILE_SIZE: "File size exceeds the limit of 5MB",
    LIMIT_FILE_COUNT: "Too many files uploaded. Please upload only one file.",
    DEFAULT: "File upload error",
  };
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: messages[err.code] || messages.DEFAULT,
    messages: DEFAULT,
    error: err.message,
  });
};
const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return formatZodError(res, err);
  }
  if (err instanceof MulterError) {
    const { status, message, err } = handleMulterError(err);
    return res.status(status).json({
      message,
      error: err,
      errorCode: ErrorCodeEnum.FILE_UPLOAD_ERROR,
    });
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
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: err.message || "An unexpected error occurred.",
  });
};

module.exports = ErrorHandler;
