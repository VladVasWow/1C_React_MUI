import { queryCatigoryes, queryCatigoryesByRoot } from "./query1c";
import { conectionString, getHeaders } from "./settings";

export const fetchCategoryByPerentID = ({params}) => {
    return new Promise((res) => {
        setTimeout(
            () => res([
            
                {
                name: "Category 11",
                ID: 11,
                description: "F dfg d fd gdf dsfg  fgsdfgsdfg fgsdfg dfg dsfg dfg",
                image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"
            },
            {
                name: "Category 12",
                ID: 11,
                description: "F dfg d fd gdf dsfg  fgsdfgsdfg fgsdfg dfg dsfg dfg",
                image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"
            }        
        
        ]), 1000)
    })
};

export const fetchCatigories = () => {
    return new Promise((res) => {
        setTimeout(
            () => res([
                {
                    name: "Category 1",
                    ID: 1,
                    image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"

                },
                {
                    name: "Category 2",
                    ID: 2,
                    image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"

                },
                {
                    name: "Category 3" ,
                    ID: 3,
                    image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"
                },
                {
                    name: "Category 4",
                    ID: 4,
                    image: "https://images.prom.ua/2626997613_w640_h640_kontaktor-modulnij-1.jpg"
                }
            ])
        ), 1000
    })
};

//ктегорії відпорятковані батьківській категорії
export const fetchCatigories1CByPerentID = () => {
 
    return   fetch(conectionString() + queryCatigoryes(), getHeaders())
            .then(response => response.json())      
            .then(json => json.value)
            .catch(error =>{
                console.log(error);
            });
}
// категорії підпорядковані категорії 1-го рівня(корневой)
export const fetchCatigories1CRootID = ({params}) => {
 
    return   fetch(conectionString() + queryCatigoryesByRoot(params.categoryID), getHeaders())
            .then(response => response.json())      
            .then(json => json.value)
            .catch(error =>{
                console.log(error);
            });
}