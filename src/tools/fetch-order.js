import { queryOrderPost } from "./query1c";
import { test_conectionString, RETAIL_PRICE_TYPE_ID, postHeaders } from "./settings";
import templateOrder from "../template/order.json"
import templateProduct from "../template/product.json"
import { orderSum } from "./calculations";


export const orderToJSON = (order) => {

    const orderProducts = order.map((orderLine, index) => {return {...templateProduct, 
        LineNumber : index + 1,
        Код: orderLine.product.Code,
        Номенклатура_Key: orderLine.product.Ref_Key,
        ЕдиницаИзмерения_Key: orderLine.product.ЕдиницаХраненияОстатков_Key,
        Количество: orderLine.countProduct,
        ЦенаСНДС: orderLine.price,
        СтавкаНДС: orderLine.product.СтавкаНДС}})
    const orderData = {...templateOrder, 
        DeletionMark: true,
        ТипЦен_Key:  RETAIL_PRICE_TYPE_ID, 
        Товары: orderProducts}
    return JSON.stringify(orderData);
}

export const fetchOrderPOST = (order) => {
 
    const headers = postHeaders();

    return   fetch(test_conectionString() + queryOrderPost(), {...headers, method: 'POST', body: orderToJSON(order)})
            .then(response => response.json())      
            .then(json => console.log(json))
            .catch(error =>{
                console.log(error);
            });
}