import { ShoppingBagRounded } from "@mui/icons-material"
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material"
import { SearchAppBar } from "../Tools/SearchAppBar"
import { NavLink} from "react-router-dom";
import { useSelector } from "react-redux";


export const Header = () => {
    const order = useSelector(state => state.order);
    const orderLength = order.length;
    console.log(orderLength);
    return (
        <AppBar position="static">
            <Toolbar>
                    <IconButton component={NavLink} to={"/"} color="inherit">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Кабінет кліента 
                    </Typography>
                    <SearchAppBar></SearchAppBar>
                    <IconButton component={NavLink} to={"/order/new_order"} color="inherit">
                        <Badge color="secondary" showZero={false}
                               badgeContent = {orderLength} >
                            <ShoppingBagRounded />
                        </Badge>
                    </IconButton>
    
            </Toolbar>
        </AppBar>
    )
}