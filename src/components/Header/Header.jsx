import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Toolbar, Typography, IconButton, Badge, Button, Box, Container  } from "@mui/material"
import { SearchAppBar } from "../Tools/SearchAppBar"
import { NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AccountMenu from '../Tools/AccountMenu';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { Categories } from '../Categories/Categories';


export const Header = (props) => {
    const order = useSelector(state => state.order);
    const [categoriesOpen, setCategoriesOpen] = useState(false)
    
    return (
        <AppBar position="static">
            <Toolbar>
                    <IconButton component={NavLink} to={"/"} color="inherit">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, display: {sm: "block",xs: "none"} }}>
                        Кабінет кліента 
                    </Typography>
                    <Button variant="contained" 
                            color="secondary" 
                            sx={{ display: {sm: "none",xs: "block"} }}
                            onClick={()=>setCategoriesOpen(!categoriesOpen)} >
                            Категорії</Button>
                    <Drawer
                        anchor="left"
                        open={categoriesOpen}>
                        <Container onClick= {()=>setCategoriesOpen(false)} width='110%'>
                            <Categories {...props}></Categories>
                        </Container>    

                    </Drawer>

                    <SearchAppBar></SearchAppBar>
                    <AccountMenu></AccountMenu>
                    <Tooltip title="Створити замовлення">
                        <IconButton component={NavLink} to={"/order/new_order"} color="inherit">
                            <Badge color="secondary" showZero={false}
                                badgeContent = {order.length} >
                                <ShoppingCartCheckoutIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
    
            </Toolbar>
        </AppBar>
    )
}