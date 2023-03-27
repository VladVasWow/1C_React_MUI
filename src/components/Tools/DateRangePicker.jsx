import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';


export const DateRangePicker = (props) => {

	const {ordersRange, setOrdersRange, head } = props

	return (

		<Container sx={{display: "flex", flexDirection: {md:"row", xs: "column" }, justifyContent: "center", alignItems: "center"}}>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				adapterLocale="uk">
				<Typography variant="h5" sx={{px:1}}>
					{head} з
				</Typography>
				<DatePicker
					sx = {{maxWidth: 160}}
					label="Початок періоду"
					value={dayjs(ordersRange.start)}
					onAccept={(newValue)=>setOrdersRange({...ordersRange, start: newValue})} 
					slotProps={{ textField: { variant: 'outlined' },  size: "Small" ,  py: 0, color: "error" }}/>
				<Typography variant="h5" sx={{px:1}}>
					по
				</Typography>
				<DatePicker 
					sx = {{maxWidth: 160}}
					label="Кінець періоду"
					onAccept={(newValue)=>setOrdersRange({...ordersRange, end: newValue})}
					slotProps={{ textField: { size: "Small" } }}
					value={dayjs(ordersRange.end)} />
			</LocalizationProvider>
		</Container>
	)
}

{/* */ }