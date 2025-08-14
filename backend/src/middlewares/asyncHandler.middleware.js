const asyncHandler = (fn) => {
  return (req, res, next) => {
    try {
      Promise.resolve(fn(req, res, next)).catch((err) => {
        // Log the error for debugging purposes
        console.error("Async Handler Error:", err);

        // Pass the error to the next middleware (error handler)
        next(err);
      });
    } catch (error) {
      console.log("Error in asyncHandler:", error);
    }
  };
};

module.exports = asyncHandler;
