import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CURRENCY_SIGN } from '../../tools/settings';

export const OrderTableHead = () => {
    return (      
    <TableHead>
        <TableRow sx={{ display: {md: "none",sm: "table-row"}}}>
          <TableCell colSpan={3} scope="row">Атрикуль та найменування товару</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ display: {md: "table-cell",sm: "none", xs: "none"}}}>#</TableCell>
          <TableCell sx={{ display: {md: "table-cell",sm: "none", xs: "none"}}} scope="row">Атрикуль та найменування товару</TableCell>
          <TableCell align="right" >Кількість</TableCell>
          <TableCell align="right">Ціна&nbsp;({CURRENCY_SIGN})</TableCell>
          <TableCell align="right">Сума&nbsp;({CURRENCY_SIGN})</TableCell>
          <TableCell sx={{ display: {md: "table-cell",sm: "none", xs: "none"}}} align="right"></TableCell>
        </TableRow>
    </TableHead>
    )
}

//table-row