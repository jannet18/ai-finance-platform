const { StartOfMonth } = require("date-fns");

const calculateNextReportDate = (lastSentDate) => {
  const currentDate = new Date();
  const lastSent = lastSentDate || currentDate;

  const nextDate = StartOfMonth(addMonths(lastSent, 1));

  nextDate.setHours(0, 0, 0, 0);
};

module.exports = { calculateNextReportDate };
