/* Your Code Here */
// Function to create an employee record
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

// Function to create a time-in event for an employee
function createTimeInEvent(employee, dateTime) {
  if (!employee || !dateTime) {
    return undefined;
  }

  const dateTimeParts = dateTime.split(' ');
  if (dateTimeParts.length !== 2) {
    return undefined;
  }

  const [date, hour] = dateTimeParts;
  const timeInEvent = {
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date: date,
  };
  employee.timeInEvents.push(timeInEvent);
  return employee;
}

// Function to create a time-out event for an employee
function createTimeOutEvent(employee, dateTime) {
  if (!employee || !dateTime) {
    return undefined;
  }

  const dateTimeParts = dateTime.split(' ');
  if (dateTimeParts.length !== 2) {
    return undefined;
  }

  const [date, hour] = dateTimeParts;
  const timeOutEvent = {
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date: date,
  };
  employee.timeOutEvents.push(timeOutEvent);
  return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);
  if (timeIn && timeOut) {
    return (timeOut.hour - timeIn.hour) / 100;
  }
  return 0;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

// Function to calculate all wages for an employee
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(this, d);
  }.bind(this), 0);

  return payable;
};

// Function to find an employee by first name in an array of records
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

// Function to calculate total payroll for an array of employee records
function calculatePayroll(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(
    (totalPayroll, employee) => totalPayroll + allWagesFor.call(employee),
    0
  );
}

module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  findEmployeeByFirstName,
  calculatePayroll,
};
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

