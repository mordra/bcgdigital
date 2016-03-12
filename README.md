# Code challenge
This is a coding challenge to calculate the number of days between two dates (not including the start or end date) for any given time between 01/01/1901 and 31/12/2999. It will accurately handle leap years and do not make use of any in-built time based libraries (other than for testing).

*To run the project:*

1. `git clone https://github.com/mordra/date-calculator`
2. `npm i`
3. `npm test`

*Sample inputs:*

`> node dateCalculator "01/01/2000" "01/01/2999"` 

outputs:

`There are exactly 364877 days between the two dates.`

*Package dependencies:*

momentjs - I test against momentjs to make sure my results are correct.

mocha - For a simple test framework that illustrates the point without complicating things.
