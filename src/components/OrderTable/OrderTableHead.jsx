import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CURRENCY_SIGN } from '../../tools/settings';

export const OrderTableHead = () => {
    return (      
    <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Товар</TableCell>
          <TableCell align="right">Кількість</TableCell>
          <TableCell align="right">Ціна&nbsp;({CURRENCY_SIGN})</TableCell>
          <TableCell align="right">Сума&nbsp;({CURRENCY_SIGN})</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
    </TableHead>
    )
}