import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CountEditor } from '../Tools/CountEditor';
import { useState, useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from "@mui/material"
import { ccyFormat } from '../../tools/format';
import { useDispatch } from "react-redux";
import { deleteProductFromOrder, changeCountProduct } from "../Slices/orderSlice";
import { showMessage } from '../Slices/snackMessageSlice';

export const OrderTableRow = (props) => {
    const {row, index, order} = props;
    const [countProduct, setCountProduct] = useState(row.countProduct);
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (order[index].countProduct !== countProduct) {
            dispatch(changeCountProduct({index, countProduct}))
        }
          
    },[countProduct]) 

    const onClickDeleteIcon = () => {
        dispatch(deleteProductFromOrder(index));
        dispatch(showMessage({type : "warning", textMessage: `Товар ${row.product.Description} видалено з кошику.`}));
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell align="right">{index+1}</TableCell>
        <TableCell component="th" scope="row">
            {row.product.Code+", "+ row.product.Description}
        </TableCell>
        <TableCell align="right">
            <CountEditor
                countProduct = {countProduct}
                setCountProduct = {setCountProduct}
                unit = {row.product.ЕдиницаХраненияОстатков____Presentation}
            >
            </CountEditor>
        </TableCell>
        <TableCell align="right">{ccyFormat(row.price)}</TableCell>
        <TableCell align="right">{ccyFormat(row.countProduct * row.price)} </TableCell>
        <TableCell align="right"> 
            <IconButton onClick = {onClickDeleteIcon}>
                <DeleteForeverIcon color="primary"></DeleteForeverIcon>
            </IconButton>
        </TableCell>
      </TableRow>      
    )
}