//http://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-node-js
console.log(process.argv[2] + " " + process.argv[3]);
if (process.argv.length >= 4)
  console.log("There are exactly " + calculator(process.argv[2], process.argv[3]) + " days between the two dates.");


/**
 * Takes in two dates and calculate the days in-between, not counting the start or end date.
 * @param begin - dates in string format DD/MM/YYYY
 * @param end - same as begin
 * @returns {number} - days in-between dates or 0 if anything is invalid
 */
function calculator(begin, end) {
  var begin = parseDate(begin);
  var end = parseDate(end);

  if (!begin || !end)
    return 0;
  if (begin.y > end.y)
    return 0;
  if (!isDateValid(begin) || !isDateValid(end))
    return 0;

  // same year, exclude start date
  if (begin.y === end.y)
    return Math.max(dayOfYear(end) - dayOfYear(begin) - 1, 0);

  var totalDays = 0;
  // days of years in-between
  for (var i = begin.y + 1; i < end.y; i++) {
    totalDays += 365 + leapYear(i);
  }

  // days of end date, exclude the actual end date (e.g 1/1/YYYY = 0)
  totalDays += dayOfYear(end) - 1;

  // days of begin date to the next year
  totalDays += 365 + leapYear(begin.y) - dayOfYear(begin);

  return totalDays;
};


/**
 * takes a string of the format DD/MM/YYYY or D/M/YYYY and returns the internal representation {d:D, m:M, y:YYYY}
 * @param dateStr
 * @returns {*}
 */
function parseDate(dateStr) {
  if (!dateStr)
    return null;

  //https://regex101.com/
  var match = /(\d{1,2}).+?(\d{1,2}).+?(\d{4})/.exec(dateStr);

  if (match.length != 4)
    return null;

  return {
    d: parseInt(match[1]),
    m: parseInt(match[2]),
    y: parseInt(match[3])
  };
}

function dayOfYear(date) {
  var daysInMonthCumulative = {
    0 : 0,
    1 : 31,
    2 : 59,//28,
    3 : 90,//31,
    4 : 120,//30,
    5 : 151,//31,
    6 : 181,//30,
    7 : 212,//31,
    8 : 243,//31,
    9 : 273,//30,
    10: 304,//31,
    11: 334,//30,
    12: 365//31
  };

  var leapYearOffset = 0;
  if (date.m > 2)
    leapYearOffset=leapYear(date.y);

  //https://en.wikipedia.org/wiki/Month#Julian_and_Gregorian_calendars
  return date.d + daysInMonthCumulative[date.m - 1] + leapYearOffset;
}

function leapYear(year) {

  //https://en.wikipedia.org/wiki/Leap_year - definition of a leap year
  if (year % 4 !== 0)
    return 0;

  if (year % 100 !== 0)
    return 1;

  if (year % 400 !== 0)
    return 0;

  return 1;
}

function isDateValid(date) {
  var daysInMonth = {
    1 : 31,
    2 : 28,
    3 : 31,
    4 : 30,
    5 : 31,
    6 : 30,
    7 : 31,
    8 : 31,
    9 : 30,
    10: 31,
    11: 30,
    12: 31
  };

  if (date.y < 1901 || date.y > 2999)
    return false;
  if (date.m < 1 || date.m > 12)
    return false;
  // for leap years, feb 29 is valid
  if (date.d < 1 || date.d > daysInMonth[date.m] + (date.m === 2 ? leapYear(date.y) : 0))
    return false;

  return true;
}

module.exports = calculator;