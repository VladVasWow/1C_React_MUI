import { useState, useEffect } from "react"
import { Container, Typography } from '@mui/material';
import {List, Collapse} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { fetchOrderProducts, fetchOrders } from "../tools/fetch-order";
import { ccyFormat } from "../tools/format";
import { CURRENCY_SIGN } from "../tools/settings";
import AssignmentIcon from '@mui/icons-material/Assignment';
import BlockIcon from '@mui/icons-material/Block';
import Paper from '@mui/material/Paper';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const AccountPage = () => {
    const [orders, setOrders] = useState([]);
    const [productsByOrder, setProductsByOrder] = useState({})
    useEffect(() => {
        fetchOrders()
            .then(setOrders)
    }, [])

    // useEffect(() => {
    //     if ()
    //     fetchOrders()
    //         .then(setOrders)
    // }, [orders])

    const handleClick = (n) => {
        if (!orders[n].open && !productsByOrder[orders[n]]) {
            fetchOrderProducts(orders[n].Ref_Key)
                .then(productsOrder =>  setProductsByOrder({...productsByOrder, [orders[n].Ref_Key] : productsOrder}))

        }
        setOrders(orders.map((order, index) => {return {...order, open: (n == index)? !order.open : order.open}}))
      };
      console.log(productsByOrder);

    return (
        <Container component={Paper} sx={{ width: '100%'}}>
            <Typography variant="h6">
                Перелік замовлень:
            </Typography>
            <List  component="nav" > {orders.map((order, index) => { 
                return (
                <Container key = {order.Ref_Key}>    
                    <ListItem disablePadding  component="div">
                        <ListItemButton sx={{p:0}} onClick ={()=> handleClick(index)}>
                            <ListItemIcon>
                                {(order.DeletionMark) ? <BlockIcon color="error"/> : <AssignmentIcon color={(order.Posted ? "primary":"disabled" )} /> }
                            </ListItemIcon>
                            <ListItemText 
                                primary={`Замовлення № ${order.Number} від ${new Date(order.Date).toLocaleDateString()} на суму ${ccyFormat(order.СуммаДокумента)} ${CURRENCY_SIGN}`} 
                                secondary={order.Комментарий}/>
                            {order.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={order.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {productsByOrder[order.Ref_Key] && productsByOrder[order.Ref_Key].map((product, index) => {
                                return (<ListItemText 
                                            key = {product.LineNumber}
                                            secondary={`${product.Код}, 
                                                ${product.Номенклатура.Description} 
                                                ${ccyFormat(product.ЦенаСНДС)} Х ${product.Количество} ${product.ЕдиницаИзмерения.Description} 
                                                Σ  ${ccyFormat(product.Сумма + product.СуммаНДС)}`} 
                                        />)})}
                        </List>
                    </Collapse>
                </Container>)})}
            </List>
        </Container>
    );
}