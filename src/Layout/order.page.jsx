import {Table, TableBody, TableContainer, Paper, Typography} from '@mui/material';
import { OrderTableHead } from "../components/OrderTable/OrderTableHead";
import { OrderTableRow } from "../components/OrderTable/OrderTableRow";
import { OrderTableFooter } from "../components/OrderTable/OrderTableFooter";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { fetchOrderPOST } from "../tools/fetch-order";
import { orderSum } from "../tools/calculations";

export const OrderPage = () => {

    const order = useSelector(state => state.order);

    const onClickOrderSend = () => {
        fetchOrderPOST(order)
    }

    return (
        <Container sx={{ mt: 1 }}>
        <Typography variant="h6">
            Нове замовлення
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 500 }} aria-label="order">
                <OrderTableHead></OrderTableHead>
                <TableBody>
                    {order.map((row, index) => (
                        <OrderTableRow
                            key={row.product.Ref_Key}
                            row={row}
                            index={index}
                            order={order}>
                        </OrderTableRow>
                    ))}
                    <OrderTableFooter sum = {orderSum(order)}>
                    </OrderTableFooter>
                </TableBody>
            </Table>
        </TableContainer>
        <Button variant="contained" 
                disabled={(order.length===0)} 
                sx={{ mt: 2 }} 
                endIcon={<SendIcon />}
                onClick={onClickOrderSend}>
            Відправити замовлення.
        </Button>
        </Container>
    );
}