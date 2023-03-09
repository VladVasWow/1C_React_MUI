import { List, ListItemIcon, ListItemText, Box, ListItem, ListItemButton, ListItemAvatar, Avatar } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import { useState, useEffect } from "react";
import { fetchCatigories, fetchCatigories1CByPerentID } from "../../tools/fetch-catigories";
import { NavLink } from "react-router-dom";
import { getProductImageURL } from "../../tools/fetch-product";


export const Catigories = () => {

    const [catigories, setCatigories] = useState([]);

    useEffect(() => {
        fetchCatigories1CByPerentID()
            .then(setCatigories);
    }, [])

    if (catigories.lenght === 0) return null;

    return (
        <Box sx={{ maxWidth: { md:250, sm: 160 }, display: {sm: "block",xs: "none"}}} width='100%'>
            <List > {catigories.map((catigoryInfo) => {
                return (

                    <ListItem button component={NavLink}
                        to={"catigories/" + catigoryInfo.Ref_Key}
                        key={catigoryInfo.Ref_Key} disablePadding
                        sx={{ mt: 1 }}
                    >
                        <ListItemAvatar>
                            <Avatar alt={catigoryInfo.Ref_Key}
                                // src =  {catigoryInfo.ОсновноеИзображение ? getProductImageURL(catigoryInfo.ОсновноеИзображение):"/noimages.png"} />
                                src={catigoryInfo.ОсновноеИзображение ? "data:image/jpeg;base64," + catigoryInfo.ОсновноеИзображение.Хранилище_Base64Data : "/noimages.png"} />
                        </ListItemAvatar>
                        <ListItemText primary={catigoryInfo.Description} />
                    </ListItem>
                )
            })}
            </List>
        </Box>
    )
}

//<NavLink to = {"catigories/" + catigoryInfo.Ref_Key}
//key = {catigoryInfo.Ref_Key}
//state={{rootID: catigoryInfo.Ref_Key}}>