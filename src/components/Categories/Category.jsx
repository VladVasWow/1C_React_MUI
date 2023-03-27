import { ListItemText, ListItem, ListItemAvatar, Avatar } from "@mui/material";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchDataFromStorage1C } from "../../tools/fetch-other";

export const Category = (props) => {

    const [imageData, setImageData] = useState(null);
    const {catigoryInfo} = props;

    useEffect(() => {
        if (catigoryInfo.ОсновноеИзображение) {
        fetchDataFromStorage1C(catigoryInfo.ОсновноеИзображение.Ref_Key)
            .then(setImageData);
    }}, [])

    // dfgdfg
    
    
    return (
                    <ListItem button component={NavLink}
                        to={"catigories/" + catigoryInfo.Ref_Key}
                        key={catigoryInfo.Ref_Key} disablePadding
                        sx={{ mt: 1 }}
                    >
                        <ListItemAvatar>
                            <Avatar alt={catigoryInfo.Ref_Key}
                                // src =  {catigoryInfo.ОсновноеИзображение ? getProductImageURL(catigoryInfo.ОсновноеИзображение):"/noimages.png"} />
                                src={catigoryInfo.ОсновноеИзображение ? "data:image/jpeg;base64," + imageData : "/noimages.png"} />
                        </ListItemAvatar>
                        <ListItemText primary={catigoryInfo.Description} />
                    </ListItem>
                )

                }