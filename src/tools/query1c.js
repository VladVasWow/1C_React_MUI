import {
    odata1cDateFormat
} from "./format"
import {
    CLIENT_ID,
    EMPTY_LINK_ID,
    getBaseProductFields,
    PRODUCTS_ON_PAGE,
    PRODUCT_CODE_LENGTH,
    RETAIL_PRICE_TYPE_ID
} from "./settings"

export const queryCatigoryes = (parentID = EMPTY_LINK_ID) => {
    return ("Catalog_КатегорииТоваров?&$filter=Parent_Key eq guid'" + parentID + "' and not DeletionMark" +
        "&$format=json" +
        "&$expand=ОсновноеИзображение" +
        "&$select=Ref_Key,Description,ОсновноеИзображение/Ref_Key" +
        "&$orderby=Description")
}


export const queryCatigoryesByRoot = (rootID = EMPTY_LINK_ID) => {
    return ("Catalog_КатегорииТоваров?" +
        "&$filter=((КорневаяКатегория_Key eq guid'" + rootID + "') and (КорневаяКатегория_Key ne Ref_Key)) and not DeletionMark" +
        "&$format=json&" +
        "&$select=Ref_Key,Description,КорневаяКатегория_Key,Parent_Key" +
        "&$orderby=Description")
}

// export const queryProductsByCategoryID = (categoryID = EMPTY_LINK_ID, page = 1) => {
//     return ("Catalog_Номенклатура?"+
//     "$filter=ИспользуетВебСайт and (Категория_Key eq guid'"+ categoryID +"')"+
//     "&$top=" + page * PRODUCTS_ON_PAGE + "&$skip=" + (page - 1) * PRODUCTS_ON_PAGE +
//     "&$format=json&$expand=ОсновноеИзображение")
// }

export const queryProductsByCategoryID = (categoryID, page = 1, searchText = "") => {
    return ("Catalog_Номенклатура?" +
        "$filter=" +
        "(ИспользуетВебСайт) and " +
        "(not DeletionMark) and " +
        ((categoryID) ? " ((Категория_Key eq guid'" + categoryID + "') or (Категория/Parent_Key eq guid'" + categoryID + "') or (Категория/Parent/Parent_Key eq guid'" + categoryID + "'))" : "") +
        ((searchText) ? "(like(НаименованиеПолное,  '%" + searchText + "%'))" : "") +
        "&$skip=" + (page - 1) * PRODUCTS_ON_PAGE + "&$top=" + PRODUCTS_ON_PAGE +
        "&$format=json" +
        "&$orderby=Description" +
        "&$select=" + getBaseProductFields() +
        "&$expand=ОсновноеИзображение")
}

export const queryProductByCodeBarcode = (codeBarcode) => {
    if (codeBarcode.length === PRODUCT_CODE_LENGTH) { 
        // пошук за кодом товара
        return ("Catalog_Номенклатура?" +
            "$filter=" +
//            "(ИспользуетВебСайт) and " +
            "(not DeletionMark) and " +
            `(Code eq '${codeBarcode}')` +
            "&$format=json&$top=1" +
            "&$select=" + getBaseProductFields() +
            "&$expand=ОсновноеИзображение")
    } else { 
        //пошук за штрихкодом
        return ("InformationRegister_Штрихкоды?" +
            "$filter=" +
//            "(ИспользуетВебСайт) and " +
            "(not Владелец/DeletionMark) and " +
            `(Штрихкод eq '${codeBarcode}')` +
            "&$format=json&$top=1" +
            "&$select=" + getBaseProductFields("Владелец/") +
            "&$expand=Владелец,Владелец/ОсновноеИзображение,Владелец/ЕдиницаХраненияОстатков")
    }
}

// substringof(Str1, Str2)
export const queryProductsByCategoryIDCount = (categoryID, searchText = "") => {
    return ("Catalog_Номенклатура/$count?" +
        "$filter=" +
        "(ИспользуетВебСайт) and " +
        "(not DeletionMark) and " +
        ((categoryID) ? " ((Категория_Key eq guid'" + categoryID + "') or (Категория/Parent_Key eq guid'" + categoryID + "') or (Категория/Parent/Parent_Key eq guid'" + categoryID + "'))" : "") +
        ((searchText) ? "(like(НаименованиеПолное,  '%" + searchText + "%'))" : "") +
        //        ((searchText) ? "(substringof('"+ searchText +"', Description))" :"") +
        //    "&$select=Ref_Key"+
        //    "&$orderby=Description"+
        "&$format=json")
}

export const queryPricesByUnits = (units, priceType = RETAIL_PRICE_TYPE_ID) => {
    return ("InformationRegister_ЦеныКомпании_RecordType/SliceLast?" +
        "Condition=ТипЦен_Key eq guid'" + priceType + "' and (false " +
        units.map((product) => {
            return " or ЕдиницаИзмерения_Key eq guid'" + product.ЕдиницаХраненияОстатков_Key + "'"
        }).join("") +
        ")&$format=json"
    )
}

export const queryStorage = (objectID) => {
    return ("Catalog_ХранилищеДополнительнойИнформации(guid'" + objectID + "')?" +
        "$format=json&$select=Хранилище_Base64Data"
    )
}

export const queryOrderPost = () => {
    return ("Document_туКоммерческоеПредложение?" +
        "$format=json"
    )
}

export const queryGetOrders = ({
    start,
    end
}) => {
    return (`Document_туКоммерческоеПредложение?$filter= (Контрагент_Key eq guid'${CLIENT_ID}')` +
        ` and (Date ge datetime'${odata1cDateFormat(start)}') and (Date le '${odata1cDateFormat(end)}')` +
        `&$select=Ref_Key, Number, Date, СуммаДокумента, DeletionMark, Posted` +
        `&$format=json&$orderby=Date`);
}

export const queryGetOrderProducts = (orderID) => {
    return (`Document_туКоммерческоеПредложение_Товары?$filter= Ref_Key eq guid'${orderID}'` +
        `&$select=LineNumber, Код, Номенклатура/Description, ЕдиницаИзмерения/Description, Количество, ЦенаСНДС, Сумма, СуммаНДС` +
        `&$expand=Номенклатура, ЕдиницаИзмерения` +
        `&$format=json&$orderby=LineNumber`);
}