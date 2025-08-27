const { PAYMENT_METHOD = {} } = require("../models/transaction.model");
const receiptPrompt = `You are an AI assistant that extracts relevant financial information from a receipt image (base64 encoded). Analyze the receipt image (base64 encoded) and  extract transaction details matching this exact in JSON format:
{
"title": "string", // A brief description of the transaction,
"amount": number, // The total amount spent in the
"date": "   ISO date string", // The date of the transaction in YYYY-MM-DD format,
"description": "string", // A detailed description of the transaction,
"category": "string", // The category of the transaction,
"type": "expense", // Always "EXPENSE" for receipt transactions
"category": "string", // The category of the transaction,
"paymentMethod": "string", // One of: ${Object.values(PAYMENT_METHOD).join(",")},
}

Rules:
1. Amount must be a positive number.
2. Date must be valid and in ISO format.
3.Category must match our enum values.
4. If uncertain about any field, omit it.
5. if not a receipt, return empty JSON {}

Example valid response:
{
"title": "Grocery Shopping at Walmart",
"amount": 150.75,
"date": "2023-10-15",
"description": "Weekly groceries including fruits, vegetables, and snacks",
"category": "Groceries",
"type": "EXPENSE",
"paymentMethod": "CARD" }
`;

const reportInsightsPrompt = ({
  totalIncome,
  totalExpenses,
  availableBalance,
  savingRate,
  netSavings,
  categories,
  periodLabel,
}) => {
  const categoriesList = Object.entries(categories)
    .map(
      ([name, { amount, percentage }]) =>
        `- ${name}: ${amount} (${percentage}%)`
    )
    .join("\n");
  return `You are a friendly and smart financial coach, not a robot.

Your job is to give **exactly 3 good short insights** to the user based on their data that feel like you're talking to them directly.

Each insight should reflect the actual data and sound like something a smart money coach would say based on the data — short, clear, and practical.


🧾 Report for: ${periodLabel}
-Total Income: $${totalIncome.toFixed(2)}
-Total Expenses: $${totalExpenses.toFixed(2)}
-Available Balance: $${availableBalance.toFixed(2)}
-Saving Rate: ${savingRate.toFixed(2)}%
-Net Savings: $${netSavings.toFixed(2)}
-Top Spending Categories:
${categoriesList}


📌 Guidelines:
- Keep each insight to one short, realistic, personalized, natural sentence
- Use conversational language, correct wordings & Avoid sounding robotic, or generic
- Include specific data when helpful and comma to amount
- Be encouraging if user spent less than they earned
- Format your response **exactly** like this:

["Insight 1", "Insight 2", "Insight 3"]

Example:
[
   "Nice! You kept $7,458 after expenses — that’s solid breathing room.",
   "You spent the most on 'Meals' this period — 32%. Maybe worth keeping an eye on.",
   "You stayed under budget this time. That's a win — keep the momentum"
]

⚠️ Output only a **JSON array of 3 strings**. Do not include any explanation, markdown, or notes.

`.trim();
};
module.exports = { receiptPrompt, reportInsightsPrompt };
