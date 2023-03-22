import { Table, TableContainer, Paper, Typography } from '@mui/material';
import { OrderTableHead } from "../components/NewOrderTable/OrderTableHead";
import { OrderTableBody } from "../components/NewOrderTable/OrderTableBody";
import { OrderTableFooter } from "../components/NewOrderTable/OrderTableFooter";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { fetchOrderPOST } from "../tools/fetch-order";
import { orderSum } from "../tools/calculations";

export const NewOrderPage = () => {

    const order = useSelector(state => state.order);

    const onClickOrderSend = () => {
        fetchOrderPOST(order)
    }

    return (
        <Container sx={{px: {xs: 1 }}} aria-label = "new-order-page">
            <Typography variant="h6">
                Нове замовлення
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
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