const { z } = require("zod");

const baseTransactionSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Type must be either 'INCOME' or 'EXPANSE'" }),
  }),
  amount: z.number().positive("Amount must be a positive number"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(255, "Category is too long"),
  date: z
    .union([z.string().datetime({ message: "Invalid Date Format" }), z.date()])
    .transform((val) => new Date(val)),
  isRecurring: z.boolean().default(false),
  recurringInterval: z
    .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"], {
      errorMap: () => ({
        message:
          "Recurring interval must be one of 'daily', 'weekly', 'monthly', or 'yearly'",
      }),
    })
    .nullable()
    .optional(),
  receiptUrl: z.string().optional(),
  paymentMethod: z.enum(
    ["CASH", "CARD", "MOBILE_PAYMENT", "AUTO_DEBIT", "BANK_TRANSFER", "OTHER"],
    {
      errorMap: () =>
        ({
          message:
            "Payment method must be one of 'cash', 'credit', 'debit', or 'bank'",
        }).default("CASH"),
    }
  ),
});

// const createTransactionSchema = baseTransactionSchema.extend({});

// const updateTranscationSchema = baseTransactionSchema.extend({});
