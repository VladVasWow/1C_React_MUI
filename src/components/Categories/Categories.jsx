import { List, ListItemText, Box, ListItem, ListItemAvatar, Avatar } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import { useState, useEffect } from "react";
import { fetchCatigories, fetchCatigories1CByPerentID } from "../../tools/fetch-catigories";
import { NavLink } from "react-router-dom";
import { Catigory } from "./Category";



export const Catigories = () => {

    const [catigories, setCatigories] = useState([]);

    useEffect(() => {
        fetchCatigories1CByPerentID()
            .then(setCatigories);
    }, [])

    return (
        <Box sx={{ maxWidth: { md:250, sm: 160 }, display: {sm: "block",xs: "none"}}} width='100%'>
            <List > {(catigories) ? catigories.map((catigoryInfo) => {
                return (
                    <Catigory key={catigoryInfo.Ref_Key} catigoryInfo={catigoryInfo} ></Catigory>
                )
            }): <ListItem key="1"><ListItemText>LOADING...</ListItemText></ListItem>}
            </List>
        </Box>
    )
}

//<NavLink to = {"catigories/" + catigoryInfo.Ref_Key}
//key = {catigoryInfo.Ref_Key}
//state={{rootID: catigoryInfo.Ref_Key}}>