// сума замовлення
export const orderSum = (order) => {
    return order.reduce((acc,value) =>  {return acc + value.countProduct*value.price},0)
}

// оуреглення до round знаків
export const mathRound = (value, round = 0) => {
    return Math.round(value*Math.pow(10,round))/Math.pow(10,round);
}

// значення ставки податку по назві
const getTaxByTaxName = (taxName) => {
    switch (taxName) {
        case "НДС20":  
            return 0.2;
        case "НДС7":  
            return 0.07;
        default:
            return 0;
    }
}

// сумма баз налогів + округлення до 4 знаків
export const valueWithOutTax = (value, taxName, round = 2) => {
    return mathRound((value/(1+getTaxByTaxName(taxName))),round);
}

