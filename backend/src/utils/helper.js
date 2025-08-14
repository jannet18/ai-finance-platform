const { addMonths, startOfMonth } = require("date-fns");

const calculateNextReportDate = (lastSentDate) => {
  const currentDate = new Date();
  const lastSent = lastSentDate || currentDate;

  const nextDate = startOfMonth(addMonths(lastSent, 1));

  nextDate.setHours(0, 0, 0, 0);
};

module.exports = { calculateNextReportDate };
