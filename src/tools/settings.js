export const PRODUCTS_ON_PAGE = 20;

export const IMAGE_SERVER = "http://192.168.124.13:8080/web-storage/pict/"
export const RETAIL_PRICE_TYPE_ID = "6d0a1a9b-cf0e-11d7-8890-00d0b721b194"
export const EMPTY_LINK_ID = "00000000-0000-0000-0000-000000000000"
export const CLIENT_ID = "61fe019e-852a-11db-bd19-0030482def11"
export const CONTRACT_ID = "2527381e-ebb4-11e3-9e34-0030483095e9"
export const CURRENCY_ID =  "6d0a1a97-cf0e-11d7-8890-00d0b721b194"

export const CURRENCY_SIGN = "₴"

export const dataBase = {
    protocol: "https",
    server: "1csync.mailcn.com.ua",//"VenaCentr.1c.local.net",
    port: "9443",//"8080",
    dataBase: "VenaCentr",
    user: "website",//"Администратор", !!!!
    password: "ty4hD65G7T"
}

 const testDataBase = {
    protocol: "http",
    server: "192.168.124.10",//"VenaCentr.1c.local.net",
    port: "80",//"8080",
    dataBase: "VenaCentr_Vlad",
    user: "Администратор",
    password: "524288"
}
export const test_conectionString = () => {
    return `${testDataBase.protocol}://${testDataBase.server}:${testDataBase.port}/${testDataBase.dataBase}/odata/standard.odata/`;
}

export const conectionString = () => {
    return `${dataBase.protocol}://${dataBase.server}:${dataBase.port}/${dataBase.dataBase}/odata/standard.odata/`;
}

export const postHeaders = () => {

    const credentials = btoa(unescape(encodeURIComponent(testDataBase.user+":"+testDataBase.password)));
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