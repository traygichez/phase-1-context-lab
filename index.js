function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    this.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date: date
    });
  
    return this;
  }


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payRate = this.payPerHour;
    return hoursWorked * payRate;
  }
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPay, employee) => {
      return totalPay + allWagesFor.call(employee);
    }, 0);
  }