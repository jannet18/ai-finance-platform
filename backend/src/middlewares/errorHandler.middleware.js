import { HTTPSTATUS } from "../config/httpConfig";

export const ErrorHandler = (err, req, res, next) => {
  if (error instanceof AppError) {
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
