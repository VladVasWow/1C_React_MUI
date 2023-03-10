import { queryPricesByUnits, queryProductsByCategoryID, queryProductsByCategoryIDCount } from "./query1c";
import { conectionString, getHeaders, IMAGE_SERVER, PRODUCTS_ON_PAGE } from "./settings";

export const fetchProductByID = ({params}) => {
    console.log(params);
    return new Promise((res) => {
        setTimeout(
            () => res({
                name: "product #" + params.productID,
                price: 1000.99,
                ID: params.productID,
                description: "F dfg d fd gdf dsfg  fgsdfgsdfg fgsdfg dfg dsfg dfg",
                image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"
            }), 1000)
    })
};

export const fetchProducts = ({params}) => {
    return new Promise((res) => {
        setTimeout(
            () => res([
                {
                    name: "product #" + 111,
                    ID: 111,
                    image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"

                },
                {
                    name: "product #" + 211,
                    ID: 211,
                    image: "https://content2.rozetka.com.ua/goods/images/big_tile/75233477.jpg"

                },
                {
                    name: "product #" + 131,
                    ID: 131,
                    image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"
                },
                {
                    name: "product #" + 116,
                    ID: 116,
                    image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"
                },
                {
                    name: "product #" + 144,
                    ID: 144,
                    image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"
                },
                {
                    name: "product #" + 1331,
                    ID: 1331,
                    image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"
                },
            ])
        ), 10000
    })
};

// export const fetchProducts1C = ({params, request}) => {
//     const searchParams = new URL(request.url).searchParams;
//     const page = searchParams.get('page');
//     console.log(params);
//     console.log(page);
//     return fetch(conectionString()+queryProductsByCategoryID(params.categoryID, page), getHeaders())
//             .then(response => response.json())      
//             .then(json => json.value)
//             .catch(error =>{
//                 console.log(error);
//             });
// }

export const fetchProducts1C = ({params, request}) => {
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get('page');
    const searchText = searchParams.get('find');
    let countProducts = 0;
    let products = [];
    console.log(params);
    console.log(page);
    return fetch(conectionString()+queryProductsByCategoryIDCount(params.categoryID, searchText), getHeaders()) // кількість елементів
            .then(response => response.text()) 
            .then(text => {countProducts = text;
                    console.log(countProducts);
                    return fetch(conectionString()+queryProductsByCategoryID(params.categoryID,page, searchText), getHeaders())
                    }) // товари
            .then(response => response.json())     
            .then(json => { products = json.value;
                return fetch(conectionString()+queryPricesByUnits(products), getHeaders())
                }) // ціни
            .then(response => response.json())      
            .then(json =>{ return {products, prices: json.value, count: Math.ceil(countProducts/PRODUCTS_ON_PAGE)}})
            .catch(error =>{
                console.log(error);
            });
}

export const fetchProduct1CByID = ({params}) => {
   
    return   fetch(conectionString()+`Catalog_Номенклатура?$filter= Ref_Key eq guid'${params.productID}'&$format=json&$expand=ОсновноеИзображение`, getHeaders())
            .then(response => response.json()) 
            .then(json => json.value[0]) 
            .catch(error =>{
                console.log(error);
            });
}

export const getProductImageURL =(storage1c) => {
    //return ( `${baseVenaCentr.protocol}://${baseVenaCentr.server}:${baseVenaCentr.port}/${baseVenaCentr.dataBase}/hs/WebSite/GetPictureByID/` + Ref_Key);
    //return "http://mob1csync.mailcn.com.ua:9690/web-storage/pict/b977d158-e89c-4a9b-a6ec-d009306c81f9.jpg";
    return `${IMAGE_SERVER}${storage1c.Ref_Key}.${storage1c.Формат}`; // зображення з файл-серверу

}


