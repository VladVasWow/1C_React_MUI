import { fetchProduct1CByArrayOfID } from "./fetch-product";
import { queryStorage } from "./query1c";
import { conectionString, conectionStringHS, getHeaders, IMAGE_SERVER } from "./settings";

export const getProductImageURL =(storage1c) => {
    //return ( `${baseVenaCentr.protocol}://${baseVenaCentr.server}:${baseVenaCentr.port}/${baseVenaCentr.dataBase}/hs/WebSite/GetPictureByID/` + Ref_Key);
    //return "http://mob1csync.mailcn.com.ua:9690/web-storage/pict/b977d158-e89c-4a9b-a6ec-d009306c81f9.jpg";
    return `${IMAGE_SERVER}${storage1c.Ref_Key}.${storage1c.Формат}`; // зображення з файл-серверу

}

export const fetchDataFromStorage1C = (objectID) => {
 
    return   fetch(conectionString() + queryStorage(objectID), getHeaders())
            .then(response => response.json())      
            .then(json => json.Хранилище_Base64Data)
            .catch(error =>{
                console.log(error);
            });
}

export const fetchGetTopPageItems1C = () => {
 
    return   fetch(conectionStringHS("GetTopPageItems"), getHeaders())
            .then(response => response.json())
            .then(json => {return fetchProduct1CByArrayOfID(json["Номенклатура"])})     
            .catch(error =>{
                console.log(error);
            });
}
