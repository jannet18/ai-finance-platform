const { HTTPSTATUS } = require("../config/httpConfig");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { transactionSchema } = require("../validators/transaction.validator");

const createTransaction = asyncHandler(async (req, res) => {
  const body = await transactionSchema.safeParse(req.body);
  const userId = req.user._id;

  await createTransactionService({
    ...body.data,
    userId,
  });
  // Assuming user ID is available in the request context
  return res.status(HTTPSTATUS.CREATED).json({
    message: "Transaction created successfully",
    data: req.body,
  });
});

module.exports = { createTransaction };
