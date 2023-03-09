import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CountEditor } from '../Tools/CountEditor';
import { useState, useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from "@mui/material"
import { ccyFormat } from '../../tools/format';

export const OrderTableRow = (props) => {
    const {row, index, order, setOrder} = props;
    const [countProduct, setCountProduct] = useState(row.countProduct);

    useEffect(() => {
        if (order[index].countProduct !== countProduct) {
            setOrder(order.map((productRow, indexRow) => 
             indexRow === index ? {...productRow, countProduct} : productRow 
         ))
         console.log(order);
        }
          
    },[countProduct]) 

    const onClickDeleteIcon = () => {
        setOrder(order.filter((productRow) => 
            productRow !== row
         ))
//        console.log("del");
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