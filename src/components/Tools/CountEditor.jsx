import { TextField, InputAdornment } from "@mui/material";

export const CountEditor = (props) => {
    const {countProduct, setCountProduct, unit} = props;
 
    return (<TextField 
            type="number"
            value={countProduct}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' , min: 1}}
            size="small" 
            InputProps={{endAdornment: <InputAdornment position="end">{unit}</InputAdornment>}}
            onChange={(event) => setCountProduct(parseInt(event.target.value))}
            />
)
}