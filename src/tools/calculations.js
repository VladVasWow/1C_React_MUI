export const orderSum = (order) => {
    return order.reduce((acc,value) =>  {return acc + value.countProduct*value.price},0)
}