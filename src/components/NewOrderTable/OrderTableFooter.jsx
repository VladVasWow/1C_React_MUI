import {TableRow, TableFooter, TableCell, Typography} from '@mui/material';
import { ccyFormat } from '../../tools/format';
import { CURRENCY_SIGN } from '../../tools/settings';

export const OrderTableFooter = (props) => {
  const { sum } = props;
  return (
    <TableFooter >
      <TableRow >
        <TableCell colSpan={2} sx={{ display: { md: "table-cell", sm: "none", xs: "none" } }}></TableCell>
        <TableCell colSpan={1}>Сума замовлення:</TableCell>
        <TableCell colSpan={2}>
          <Typography align='right' fontWeight={600}>
            {ccyFormat(sum)} {CURRENCY_SIGN}
          </Typography>
          </TableCell>
      </TableRow>
    </TableFooter>
  )
}