import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useDispatch, useSelector } from "react-redux";
import { hideMessage } from "../Slices/snackMessageSlice";

export const SnackAppBar = () => {
    const {isSnackOpen, type, textMessage} = useSelector(state => state.snackMessage);
    const dispatch = useDispatch();
    console.log(isSnackOpen);

    const onCloseSnackBar = (event, reason) => {
        console.log(reason);
        if (reason === 'clickaway') {
            return;
          }
        dispatch(hideMessage()) 
    }    
    return (
        <Snackbar 
            open={isSnackOpen}
            autoHideDuration={2000}
            onClose = {onCloseSnackBar}>
            <Alert severity = {type}  onClose = {onCloseSnackBar}>
                {textMessage} 
            </Alert>
        </Snackbar>
    )
}