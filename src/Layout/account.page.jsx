import { useState, useEffect } from "react"
import { Container, Typography } from '@mui/material';
import {List, Collapse} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { fetchOrders } from "../tools/fetch-order";
import { ccyFormat } from "../tools/format";
import { CURRENCY_SIGN } from "../tools/settings";
import AssignmentIcon from '@mui/icons-material/Assignment';
import BlockIcon from '@mui/icons-material/Block';
import Paper from '@mui/material/Paper';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const AccountPage = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetchOrders()
            .then(setOrders)
    }, [])

    const handleClick = (n) => {
        console.log(n);
        setOrders(orders.map((order, index) => {return {...order, open: (n == index)? !order.open : order.open}}))
      };

    return (
        <Container component={Paper} sx={{ width: '100%'}}>
            <Typography variant="h6">
                Перелік замовлень:
            </Typography>
            <List> {orders.map((order, index) => { 
                return (
                <ListItem disablePadding key = {order.Ref_Key}>
                    <ListItemButton sx={{pb:0}} onClick ={()=> handleClick(index)}>
                        <ListItemIcon>
                            {(order.DeletionMark) ? <BlockIcon color="error"/> : <AssignmentIcon color={(order.Posted ? "primary":"disabled" )} /> }
                            
                        </ListItemIcon>
                        <ListItemText 
                            primary={`Замовлення № ${order.Number} від ${new Date(order.Date).toLocaleDateString()} на суму ${ccyFormat(order.СуммаДокумента)} ${CURRENCY_SIGN}`} 
                            secondary={order.Комментарий}/>
                        {order.open ? <ExpandLess /> : <ExpandMore />}
                        <Collapse in={order.open} timeout="auto" unmountOnExit>

                        </Collapse>
                    </ListItemButton>
                </ListItem>)})}
            </List>
        </Container>
    );
}