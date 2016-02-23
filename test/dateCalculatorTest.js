var dateCalculator = require('./../dateCalculator.js');
var assert = require('assert');
var moment = require('moment');

function actualMoment(begin, end) {
  return moment(end, "DD/MM/YYYY").diff(moment(begin, "DD/MM/YYYY"), 'days') - 1;
}
describe('Date calculator', function () {
  it('should return 0 when it begins after it ends', function () {
    assert.equal(dateCalculator("1/1/2000", "1/1/1000"), 0);
  });

  it('should return 0 on invalid data inputs', function () {
    assert.equal(dateCalculator(), 0);
    assert.equal(dateCalculator("1/1/2000"), 0);
    assert.equal(dateCalculator(null, "1/1/2000"), 0);
    assert.equal(dateCalculator(null, null), 0);
  });

  it('should return 0 on invalid dates', function () {
    assert.equal(dateCalculator("32/1/2001", "5/2/2001"), 0);
    assert.equal(dateCalculator("29/2/2001", "5/3/2001"), 0);
  });

  it('should pass simple cases', function () {
    begin = "2/6/1983";
    end = "22/6/1983";
    assert.equal(dateCalculator(begin, end), 19);

    begin = "4/7/1984";
    end = "25/12/1984";
    assert.equal(dateCalculator(begin, end), 173);

    // the last test case in the sample output is wrong.
    begin = "3/1/1989";
    end = "3/8/1983";
    assert.equal(dateCalculator(begin, end), 0);
  });

  it('should respect leap years', function () {
    var begin = "1/1/2000";
    var end = "1/1/2001";
    assert.equal(dateCalculator(begin, end), actualMoment(begin, end));
  });

  it('should not take 2 hrs to figure out how to handle edge cases', function () {
    // just kidding, it did take me some head scratching though

    var datePairs = [
      ["1/1/2000", "31/12/2000"],
      ["1/1/2000", "01/01/2001"],
      ["31/12/1999", "01/01/2001"],
      ["1/1/1999", "1/1/2001"],
      ["31/12/1999", "1/1/2000"]
    ];

    datePairs.forEach(function (pairs) {
      var begin = pairs[0], end = pairs[1];
      assert.equal(dateCalculator(begin, end), actualMoment(begin, end)); // moment includes start date so have to minus 1
    });
  });

  it('should handle the max range of dates', function () {
    var begin = "01/01/1901";
    var end = "31/12/2999";
    assert.equal(dateCalculator(begin, end), actualMoment(begin, end));
  })
});