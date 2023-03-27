import { Table, TableContainer, Paper, Typography, TextField,Box } from '@mui/material';
import { OrderTableHead } from "../components/NewOrderTable/OrderTableHead";
import { OrderTableBody } from "../components/NewOrderTable/OrderTableBody";
import { OrderTableFooter } from "../components/NewOrderTable/OrderTableFooter";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { fetchOrderPOST } from "../tools/fetch-order";
import { orderSum } from "../tools/calculations";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from '../components/Slices/snackMessageSlice';
import { fetchProduct1CByCodeBarcode } from '../tools/fetch-product';
import { addProductToOrder } from '../components/Slices/orderSlice';

export const NewOrderPage = () => {

    const order = useSelector(state => state.order);
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

    const onClickOrderSend = () => {
        fetchOrderPOST(order)
    }

    const onBlurSearch = (event) => {
        if (!event.target.value) return
        if (event.target.value.length < 6) {
            dispatch(showMessage({type : "warning", textMessage: `Давжина пошуку повинна бути не мешьше за 6 символів`}));
        }
        else {
            fetchProduct1CByCodeBarcode(event.target.value).then((product) => {
                console.log(product);
                dispatch(addProductToOrder(product))
                })
        }
        setSearchText("");
    }
    

    return (
        <Container sx={{px: {xs: 1 }}} aria-label = "new-order-page">
            <Box sx= {{display:"flex", mx:1}}>
            <Typography variant="h6" sx= {{flexGrow: 1}}>
                Нове замовлення
            </Typography>
            <TextField
                size="small"    
                label="Артикул або штрихкод"
                type="search"
                variant="outlined"
                value={searchText}
                onChange={(event)=>setSearchText(event.target.value)}
                onBlur={onBlurSearch}
                helperText="Швидке довавання товару за реквізитами"
                onKeyDown={ event => event.key === 'Enter' && event.target.blur()}
            />
            </Box>
            <TableContainer component={Paper} >
                <Table aria-label="order">
                    <OrderTableHead></OrderTableHead>
                    <OrderTableBody order={order} ></OrderTableBody>
                    <OrderTableFooter sum={orderSum(order)}></OrderTableFooter>
                </Table>
            </TableContainer>
            <Button variant="contained"
                disabled={(order.length === 0)}
                sx={{ mt: 2 }}
                endIcon={<SendIcon />}
                onClick={onClickOrderSend}>
                Створити замовлення
            </Button>
        </Container>
    );
}