import {TableCell, TableBody, TableRow, Typography} from '@mui/material';
import { CountEditor } from '../Tools/CountEditor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from "@mui/material"
import { ccyFormat } from '../../tools/format';
import { useDispatch } from "react-redux";
import { deleteProductFromOrder, changeCountProduct } from "../Slices/orderSlice";
import { showMessage } from '../Slices/snackMessageSlice';

export const OrderTableBody = (props) => {
    const { order } = props;
    const dispatch = useDispatch();

    const onClickDeleteIcon = (index) => {
        dispatch(deleteProductFromOrder(index));
        dispatch(showMessage({ type: "warning", textMessage: `Товар ${order[index].product.Description} видалено з кошику.` }));
    }

    return (

        <TableBody>
            {order.map((row, index) => (
            <>
                <TableRow key = {row.product.Ref_Key+"_1"} sx={{ display: {md: "none",sm: "table-row"}}}>
                    <TableCell component="th" scope="row" colSpan={3} sx = {{borderBottom:0, pb:0}}>
                        {row.product.Code + ", " + row.product.Description}
                        <IconButton  sx={{ display: {md: "none"}}}
                            onClick={() => onClickDeleteIcon(index)}>
                            <DeleteForeverIcon color="primary"></DeleteForeverIcon>
                    </IconButton>                    
                    </TableCell>
                </TableRow>

                <TableRow key = {row.product.Ref_Key+"_2"}>
                    <TableCell align="right" sx={{ display: {md: "table-cell",sm: "none", xs: "none"}}} >{index + 1}</TableCell>
                    <TableCell component="th" scope="row" sx={{ display: {md: "table-cell",sm: "none", xs: "none"}}}>
                        {row.product.Code + ", " + row.product.Description}
                    </TableCell>
                    <TableCell align="right">
                        <CountEditor
                            countProduct={order[index].countProduct}
                            setCountProduct={(countProduct)=>{dispatch(changeCountProduct({ index, countProduct }))}}
                            unit={row.product.ЕдиницаХраненияОстатков____Presentation}>
                        </CountEditor>
                    </TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                    <TableCell align="right">{ccyFormat(row.countProduct * row.price)} </TableCell>
                    <TableCell sx={{ display: {md: "table-cell",sm: "none", xs: "none"}}} align="right">
                        <IconButton onClick={() => onClickDeleteIcon(index)}>
                            <DeleteForeverIcon color="primary"></DeleteForeverIcon>
                        </IconButton>
                    </TableCell>
                </TableRow>
                </>))}
        </TableBody>
    )
}