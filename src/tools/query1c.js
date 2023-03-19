import { CLIENT_ID, EMPTY_LINK_ID, PRODUCTS_ON_PAGE, RETAIL_PRICE_TYPE_ID } from "./settings"

export const queryCatigoryes = (parentID = EMPTY_LINK_ID) => { 
    return ("Catalog_КатегорииТоваров?&$filter=Parent_Key eq guid'"+parentID+"' and not DeletionMark"+
    "&$format=json"+
    "&$expand=ОсновноеИзображение"+
    "&$select=Ref_Key,Description,ОсновноеИзображение/Ref_Key"+
    "&$orderby=Description")
}    


export const queryCatigoryesByRoot = (rootID = EMPTY_LINK_ID) => { 
    return ("Catalog_КатегорииТоваров?"+
    "&$filter=((КорневаяКатегория_Key eq guid'"+rootID+"') and (КорневаяКатегория_Key ne Ref_Key)) and not DeletionMark"+
    "&$format=json&"+
    "&$select=Ref_Key,Description,КорневаяКатегория_Key,Parent_Key"+
    "&$orderby=Description" )
}

// export const queryProductsByCategoryID = (categoryID = EMPTY_LINK_ID, page = 1) => {
//     return ("Catalog_Номенклатура?"+
//     "$filter=ИспользуетВебСайт and (Категория_Key eq guid'"+ categoryID +"')"+
//     "&$top=" + page * PRODUCTS_ON_PAGE + "&$skip=" + (page - 1) * PRODUCTS_ON_PAGE +
//     "&$format=json&$expand=ОсновноеИзображение")
// }

export const queryProductsByCategoryID = (categoryID, page = 1, searchText="") => {
    return ("Catalog_Номенклатура?"+
    "$filter="+
        "(ИспользуетВебСайт) and " +
        "(not DeletionMark) and " +
        ((categoryID) ? " ((Категория_Key eq guid'"+ categoryID +"') or (Категория/Parent_Key eq guid'"+ categoryID +"') or (Категория/Parent/Parent_Key eq guid'"+ categoryID +"'))" : "") +
        ((searchText) ? "(like(НаименованиеПолное,  '%" + searchText +"%'))" :"") +
//        ((searchText) ? "(substringof('"+ searchText +"', Description))" :"") +
        "&$skip=" + (page - 1) * PRODUCTS_ON_PAGE +"&$top=" +  PRODUCTS_ON_PAGE + 
    "&$format=json"+
    "&$orderby=Description"+
    "&$select=Ref_Key,Description,Категория_Key,Parent_Key,СтавкаНДС,Parent,Code,Описание,ЕдиницаХраненияОстатков_Key,ЕдиницаХраненияОстатков____Presentation,"+
    "ОсновноеИзображение/Формат,ОсновноеИзображение/Ref_Key"+
    "&$expand=ОсновноеИзображение, Parent")
}
// substringof(Str1, Str2)
export const queryProductsByCategoryIDCount = (categoryID, searchText= "") => {
    return ("Catalog_Номенклатура/$count?"+
    "$filter="+
        "(ИспользуетВебСайт) and "+
        "(not DeletionMark) and "+
       ((categoryID) ? " ((Категория_Key eq guid'"+ categoryID +"') or (Категория/Parent_Key eq guid'"+ categoryID +"') or (Категория/Parent/Parent_Key eq guid'"+ categoryID +"'))" : "" )+
       ((searchText) ? "(like(НаименованиеПолное,  '%" + searchText +"%'))" :"") +
//        ((searchText) ? "(substringof('"+ searchText +"', Description))" :"") +
//    "&$select=Ref_Key"+
//    "&$orderby=Description"+
    "&$format=json")
}    

export const queryPricesByUnits = (units, priceType = RETAIL_PRICE_TYPE_ID) => {
        return ("InformationRegister_ЦеныКомпании_RecordType/SliceLast?"+
            "Condition=ТипЦен_Key eq guid'" + priceType + "' and ("+
            units.map((product, index, units) => {
                return "ЕдиницаИзмерения_Key eq guid'" + product.ЕдиницаХраненияОстатков_Key + "'" + (index===units.length-1 ? "":" or ")
            }).join("") +
            ")&$format=json"
        )
}

export const queryStorage = (objectID) => {
    return ("Catalog_ХранилищеДополнительнойИнформации(guid'" + objectID +"')?"+
            "$format=json&$select=Хранилище_Base64Data"
    )
}

export const queryOrderPost = () => {
    return ("Document_туКоммерческоеПредложение?"+
            "$format=json"
    )
}

export const queryGetOrders = () => {
    return (`Document_туКоммерческоеПредложение?$filter= Контрагент_Key eq guid'${CLIENT_ID}'&$format=json&$orderby=Date`);
    
}    