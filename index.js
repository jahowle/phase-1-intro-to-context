// Your code here

testArray = [
    ["Gray", "Worm", "Security", 1],
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
    ]

let employeeRecords = []

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
   return arrayOfArrays.map(item => createEmployeeRecord(item))
}

function createTimeInEvent(record, dateTimeString) {
    let [date, timeStamp] = dateTimeString.split(" ")
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeStamp, 10),
        date,

    })

    return record
}

function createTimeOutEvent(record, dateTimeString) {
    let [date, timeStamp] = dateTimeString.split(" ")
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeStamp, 10),
        date,

    })

    return record
}

function hoursWorkedOnDate(record, targetDate) {
    let inEvent = record.timeInEvents.find(function(e){
        return e.date === targetDate
    })

    let outEvent = record.timeOutEvents.find(function(e){
        return e.date === targetDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(record, targetDate) {
    let rawWage = hoursWorkedOnDate(record, targetDate)
    * record.payPerHour
    return parseFloat(rawWage.toString())
}

function allWagesFor(record){
    let eligibleDates = record.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(record, d)
    }, 0)

    return payable
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
// function createEmployeeRecord(array){
//     for (let item of array) {
//         let employee = {
//             firstName: item[0],
//             familyName: item[1],
//             title: item[2],
//             payPerHour: item[3],
//             timeInEvents: [],
//             timeOutEvents: []
//         }

//         employeeRecords.push(employee)
//     }

// }


// createEmployeeRecord(testArray)
// console.log(employeeRecords)