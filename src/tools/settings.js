export const PRODUCTS_ON_PAGE = 20;

export const IMAGE_SERVER = "http://192.168.124.13:8080/web-storage/pict/"
export const RETAIL_PRICE_TYPE_ID = "6d0a1a9b-cf0e-11d7-8890-00d0b721b194"
export const EMPTY_LINK_ID = "00000000-0000-0000-0000-000000000000"

export const CURRENCY_SIGN = "₴"

export const dataBase = {
    protocol: "https",
    server: "1csync.mailcn.com.ua",//"VenaCentr.1c.local.net",
    port: "9443",//"8080",
    dataBase: "VenaCentr",
    user: "website",//"Администратор",
    password: "ty4hD65G7T",
}

// const baseVenaCentr = {
//     protocol: "http",
//     server: "192.168.124.10",//"VenaCentr.1c.local.net",
//     port: "80",//"8080",
//     dataBase: "VenaCentr_Vlad",
//     user: "Администратор",
//     password: "",
// }

export const conectionString = () => {
    return `${dataBase.protocol}://${dataBase.server}:${dataBase.port}/${dataBase.dataBase}/odata/standard.odata/`;
}

export const getHeaders = () => {

    const credentials = btoa(unescape(encodeURIComponent(dataBase.user+":"+dataBase.password)));
    //console.log(credentials);
    //console.log(conectionString(baseVenaCentr)+"Catalog_Номенклатура?$top=10&$format=json");
    //var auth = { "Authorization" : `Basic ${credentials}`, 'Content-Type': 'application/xml' };

   return  {headers :({"Authorization" : `Basic ${credentials}`,
                                'Content-Type': 'application/json'
                                //  "Access-Control-Allow-Origin" : "*",
                                //  "Access-Control-Allow-Credentials": "true",
                                //  "Access-Control-Max-Age": "1800",
                                //  "Access-Control-Allow-Headers": "content-type",
                                //  "Access-Control-Allow-Methods":"PUT, POST, GET, DELETE, PATCH, OPTIONS"
                            })};

}