const {
  addMonths,
  startOfMonth,
  addDays,
  addWeeks,
  addYears,
} = require("date-fns");

const calculateNextReportDate = (lastSentDate) => {
  const currentDate = new Date();
  const lastSent = lastSentDate || currentDate;

  const nextDate = startOfMonth(addMonths(lastSent, 1));

  nextDate.setHours(0, 0, 0, 0);
};

const calculateNextOccurence = (date, recurringInterval) => {
  const base = new Date(date);
  base.setHours(0, 0, 0, 0);

  switch (recurringInterval) {
    case "DAILY":
      return addDays(base, 1);
    case "WEEKLY":
      return addWeeks(base, 1);
    case "MONTHLY":
      return addMonths(base, 1);
    case "YEARLY":
      return addYears(base, 1);
    default:
      return base;
  }
};
module.exports = { calculateNextReportDate, calculateNextOccurence };
