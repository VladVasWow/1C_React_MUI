import {useLoaderData, useLocation, useParams} from "react-router-dom"
import { Container } from "@mui/system";
import { Typography, Box, Grid, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";

export const СatigoriesРage = () => {
    //const loaderData = useLoaderData();
    const catigories = useLoaderData();
    //const location = useLocation();
    //const { rootID } = location.state;
    const { categoryID } = useParams();

    return (
        <>  
                        <Box sx={{ flexGrow: 1}}>
                            <Grid container maxWidth="xl" spacing={1}>

                            {catigories.filter((catigory) => {return catigory.Parent_Key == categoryID})
                             .map((catigory)=> (                             
                                <Grid item  key = {catigory.Ref_Key} xs={12} md={4} xl={3}>
                                    <ListItemButton
                                        component={NavLink}
                                        to = {"/products/" + catigory.Ref_Key + "?page=1"}>
                                        <Typography sx={{ mt: 1, mb: 0 }} variant="h6" component="div">
                                            {catigory.Description}
                                        </Typography>
                                    </ListItemButton>
                                    <List >
                                    {catigories.filter((catigory2level) => {return catigory2level.Parent_Key == catigory.Ref_Key})
                                    .map((catigory2level)=> (
                                        <ListItem button 
                                            component={NavLink}
                                            to = {"/products/" + catigory2level.Ref_Key + "?page=1"}
                                            key = {catigory2level.Ref_Key}
                                            state={{rootID: catigory2level.Ref_Key}}
                                            sx={{ ml: 2, mb: -1 }}>

                                            <ListItemText
                                                primary={catigory2level.Description}
                                                //secondary='Secondary text'
                                            />
                                        </ListItem>
                                        ))}
                                    </List>
                                </Grid>))}
                            </Grid>    
                        </Box>
        </>)
}

// {catigories.filter((catigory) => {return catigory.Parent_Key == rootID})
// .map((catigory)=> (

//     ))}