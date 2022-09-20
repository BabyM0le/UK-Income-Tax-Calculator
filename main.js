const taxBrackets = [
    12570,
    50270,
    150000,
]

function main() {
    const userInput = {
        payPerHour: document.getElementById('payPerHour').value, // Your pay per hour
        hoursWorkedPerWeek: document.getElementById('hoursWorkedPerWeek').value, // Hours worked in a week
    }
    let payPreTax = {
        week: userInput.payPerHour * userInput.hoursWorkedPerWeek,
        month: userInput.payPerHour * userInput.hoursWorkedPerWeek * 52 / 12,
        year: userInput.payPerHour * userInput.hoursWorkedPerWeek * 52,
    }
    let payPostTax = {
        week: 0,
        month: 0,
        year: 0,
    }
    let taxAmount = 0

    function percentage(num, per){
        return (num/100)*per;
    }
    function round(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    
    // above £150,000
    if(payPreTax.year > taxBrackets[2]) {
        // £0 - £12,570
        payPostTax.year = payPreTax.year - taxBrackets[0]
    
        // £12,571 - £50,271
        payPostTax.year = payPostTax.year - (taxBrackets[1] - taxBrackets[0])
        taxAmount = taxAmount + 7540
    
        // £50,271 - £150,000
        payPostTax.year = payPostTax.year - (taxBrackets[2] - taxBrackets[1])
        taxAmount = taxAmount + 39891.6
    
        // Above £150,000
        payPostTax.year = payPostTax.year - percentage(payPostTax.year, 45)
        payPostTax.year = payPostTax.year + 12570 + 30160 + 59837
        taxAmount = taxAmount + percentage(payPostTax.year, 45)
    }
    
    // from £50,271 - £150,000
    else if (payPreTax.year > taxBrackets[1]) {
        // £0 - £12,570
        payPostTax.year = payPreTax.year - taxBrackets[0]
    
        // £12,571 - £50,271
        payPostTax.year = payPostTax.year - (taxBrackets[1] - taxBrackets[0])
        taxAmount = taxAmount + 7540
    
        // Above £50,271
        payPostTax.year = payPostTax.year - percentage(payPostTax.year, 40)
        payPostTax.year = payPostTax.year + 12570 + 30160
        taxAmount = taxAmount + percentage(payPostTax.year, 40)
    }
    
    // from £12,570 - £50,271
    else if (payPreTax.year > taxBrackets[0]) {
        // £0 - £12,570
        payPostTax.year = payPreTax.year - taxBrackets[0]
    
        // Above £12,570
        payPostTax.year = payPostTax.year - percentage(payPostTax.year, 20)
        payPostTax.year = payPostTax.year + 12570
        taxAmount = taxAmount + percentage(payPostTax.year, 20)
    }
    
    // below £12,570
    else payPostTax.year = payPreTax.year
    
    payPostTax = {
        week: round(payPostTax.year / 52),
        month: round(payPostTax.year / 12),
        year: round(payPostTax.year)
    }
    payPreTax = {
        week: round(payPreTax.week),
        month: round(payPreTax.month),
        year: round(payPreTax.year),
    }
    taxAmount = round(taxAmount)
    
    document.getElementById('preTaxSalary').value=`Week ${payPreTax.week}, Month ${payPreTax.month}, Year ${payPreTax.year}`
    document.getElementById('postTaxSalary').value=`Week ${payPostTax.week}, Month ${payPostTax.month}, Year ${payPostTax.year}`
    document.getElementById('amountToPay').value=`${taxAmount}`


    console.log('Please note that all values are rounded to 2 decimal places.')
    console.log(`Pre-tax salary: Week ${payPreTax.week}, Month ${payPreTax.month}, Year ${payPreTax.year}`)
    console.log(`Post-tax salary: Week ${payPostTax.week}, Month ${payPostTax.month}, Year ${payPostTax.year}`)
    console.log(`Amount to pay in tax is: ${taxAmount}`)
}







// const userInput = {
//     payPerHour: 15, // Your pay per hour
//     hoursWorkedPerWeek: 40, // Hours worked in a week
// }
// const taxBrackets = [
//     12570,
//     50270,
//     150000,
// ]
// let taxAmount = 0
// let payPreTax = {
//     week: userInput.payPerHour * userInput.hoursWorkedPerWeek,
//     month: userInput.payPerHour * userInput.hoursWorkedPerWeek * 52 / 12,
//     year: userInput.payPerHour * userInput.hoursWorkedPerWeek * 52,
// }
// let payPostTax = {
//     week: 0,
//     month: 0,
//     year: 0,
// }

// function percentage(num, per){
//     return (num/100)*per;
// }
// function round(num) {
//     return +(Math.round(num + "e+2")  + "e-2");
// }

// // above £150,000
// if(payPreTax.year > taxBrackets[2]) {
//     // £0 - £12,570
//     payPostTax.year = payPreTax.year - taxBrackets[0]

//     // £12,571 - £50,271
//     payPostTax.year = payPostTax.year - (taxBrackets[1] - taxBrackets[0])
//     taxAmount = taxAmount + 7540

//     // £50,271 - £150,000
//     payPostTax.year = payPostTax.year - (taxBrackets[2] - taxBrackets[1])
//     taxAmount = taxAmount + 39891.6

//     // Above £150,000
//     payPostTax.year = payPostTax.year - percentage(payPostTax.year, 45)
//     payPostTax.year = payPostTax.year + 12570 + 30160 + 59837
//     taxAmount = taxAmount + percentage(payPostTax.year, 45)
// }

// // from £50,271 - £150,000
// else if (payPreTax.year > taxBrackets[1]) {
//     // £0 - £12,570
//     payPostTax.year = payPreTax.year - taxBrackets[0]

//     // £12,571 - £50,271
//     payPostTax.year = payPostTax.year - (taxBrackets[1] - taxBrackets[0])
//     taxAmount = taxAmount + 7540

//     // Above £50,271
//     payPostTax.year = payPostTax.year - percentage(payPostTax.year, 40)
//     payPostTax.year = payPostTax.year + 12570 + 30160
//     taxAmount = taxAmount + percentage(payPostTax.year, 40)
// }

// // from £12,570 - £50,271
// else if (payPreTax.year > taxBrackets[0]) {
//     // £0 - £12,570
//     payPostTax.year = payPreTax.year - taxBrackets[0]

//     // Above £12,570
//     payPostTax.year = payPostTax.year - percentage(payPostTax.year, 20)
//     payPostTax.year = payPostTax.year + 12570
//     taxAmount = taxAmount + percentage(payPostTax.year, 20)
// }

// // below £12,570
// else payPostTax.year = payPreTax.year

// payPostTax = {
//     week: round(payPostTax.year / 52),
//     month: round(payPostTax.year / 12),
//     year: round(payPostTax.year)
// }
// payPreTax = {
//     week: round(payPreTax.week),
//     month: round(payPreTax.month),
//     year: round(payPreTax.year),
// }
// console.log('Please note that all values are rounded to 2 decimal places.')
// console.log(`Pre-tax salary: Week ${payPreTax.week}, Month ${payPreTax.month}, Year ${payPreTax.year}`)
// console.log(`Post-tax salary: Week ${payPostTax.week}, Month ${payPostTax.month}, Year ${payPostTax.year}`)
// console.log(`Amount to pay in tax is: ${taxAmount}`)