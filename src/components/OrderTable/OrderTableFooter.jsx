import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import { ccyFormat } from '../../tools/format';
import { CURRENCY_SIGN } from '../../tools/settings';

export const OrderTableFooter = (props) => {
    const {sum} = props;
    return (      
      <TableRow >
      <TableCell colSpan={2}></TableCell>
      <TableCell colSpan={2} sx={{ fontWeight: 'medium' }} align="right">Сума замовлення:</TableCell>
      <TableCell colSpan={2} sx={{ fontWeight: 'bold' }} align="right" >{ccyFormat(sum)} {CURRENCY_SIGN}</TableCell>
    </TableRow>
    )
}