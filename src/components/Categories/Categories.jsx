import { List, ListItemText, ListItem } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchCatigories1CByPerentID } from "../../tools/fetch-catigories";
import { Category } from "./Category";

export const Categories = (props) => {

    const {categories, setCategories} = props;

    useEffect(() => {
        if (categories.length === 0) 
        fetchCatigories1CByPerentID()
            .then(setCategories);
    }, [categories])

    return (
            <List > {(categories) ? categories.map((catigoryInfo) => {
                return (
                    <Category key={catigoryInfo.Ref_Key} catigoryInfo={catigoryInfo} ></Category>
                )
            }): <ListItem key="1"><ListItemText>LOADING...</ListItemText></ListItem>}
            </List>
    )
}
