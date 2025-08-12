class AppError extends Error {
  constructor(
    message,
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

class HttpException extends AppError {
  constructor(message = "HTTP Exception", statusCode = HTTPSTATUS.BAD_REQUEST) {
    super(message, statusCode);
  }
}
class NotfoundException extends AppError {
  constructor(message = "Resource not found") {
    super(message, HTTPSTATUS.NOT_FOUND);
  }
}

class BadRequestException extends AppError {
  constructor(message = "Bad request") {
    super(message, HTTPSTATUS.BAD_REQUEST);
  }
}

class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, HTTPSTATUS.UNAUTHORIZED);
  }
}

class ForbiddenException extends AppError {
  constructor(message = "Forbidden access") {
    super(message, HTTPSTATUS.FORBIDDEN);
  }
}
class InternalServerErrorException extends AppError {
  constructor(message = "Internal server error") {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  AppError,
  HttpException,
  NotfoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
};
