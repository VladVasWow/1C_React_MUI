import { queryGetOrderProducts, queryGetOrders, queryOrderPost } from "./query1c";
import { test_conectionString, RETAIL_PRICE_TYPE_ID, postHeaders, CLIENT_ID, CURRENCY_ID, CONTRACT_ID, conectionString, getHeaders } from "./settings";
import templateOrder from "../template/order.json"
import templateProduct from "../template/product.json"
import { mathRound, valueWithOutTax } from "./calculations";


const orderToJSON = (order) => {
    
    const orderProducts = order.map((orderLine, index) => {
        const priceWithOutTax = valueWithOutTax(orderLine.price, orderLine.product.СтавкаНДС,4);
        const sumWithOutTax = mathRound(priceWithOutTax * orderLine.countProduct,2);
        return {...templateProduct, 
            LineNumber : index + 1,
            Код: orderLine.product.Code,
            Номенклатура_Key: orderLine.product.Ref_Key,
            ЕдиницаИзмерения_Key: orderLine.product.ЕдиницаХраненияОстатков_Key,
            Количество: orderLine.countProduct,
            ЦенаСНДС: orderLine.price,
            Цена: priceWithOutTax,
            СтавкаНДС: orderLine.product.СтавкаНДС,
            СуммаБезСкидки: sumWithOutTax,
            Сумма: sumWithOutTax,
            СуммаНДС: mathRound(orderLine.price * orderLine.countProduct,2) - sumWithOutTax
            }
    })
    const orderData = {...templateOrder, 
        DeletionMark: false,
        Контрагент_Key: CLIENT_ID,
        ДоговорВзаиморасчетов_Key: CONTRACT_ID,
        ТипЦен_Key:  RETAIL_PRICE_TYPE_ID, 
        ВалютаДокумента_Key: CURRENCY_ID,
        Товары: orderProducts}
    return JSON.stringify(orderData);
}

export const fetchOrderPOST = (order) => {
 
    const headers = postHeaders();

    return   fetch(test_conectionString() + queryOrderPost(), {...headers, method: 'POST', body: orderToJSON(order)})
            .then(response => response.json())      
        //    .then(json => console.log(json))
            .catch(error =>{
                console.log(error);
            });
}

export const fetchOrders = (ordersRange) => {
   
    return   fetch(conectionString()+queryGetOrders(ordersRange), getHeaders())
            .then(response => response.json()) 
            .then(json => json.value) 
            .catch(error =>{
                console.log(error);
            });
}

export const fetchOrderProducts = (orderID) => {
   
    return   fetch(conectionString()+queryGetOrderProducts(orderID), getHeaders())
            .then(response => response.json()) 
            .then(json => json.value) 
            .catch(error =>{
                console.log(error);
            });
}