import { useOutletContext } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { OrderTableHead } from "../components/OrderTable/OrderTableHead";
import { OrderTableRow } from "../components/OrderTable/OrderTableRow";
import { OrderTableFooter } from "../components/OrderTable/OrderTableFooter";
import { useSelector } from "react-redux";

export const OrderPage = () => {
    const order = useSelector(state => state.order);
    console.log(order);
    return (
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
                    <OrderTableFooter sum = {order.reduce((accumulator,currentValue) => {return accumulator + currentValue.countProduct*currentValue.price},0)}></OrderTableFooter>
                </TableBody>
            </Table>
        </TableContainer>
    );
}