import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

export const SnackAppBar = (props) => {
    const {isSnackOpen, setSnackOpen} = props;
    console.log(isSnackOpen);
    return (
        <Snackbar 
            open={isSnackOpen}
            autoHideDuration={12000}
            onClose = {setSnackOpen(false)}>
            <Alert severity = "info">
                This is a success message! 
            </Alert>
        </Snackbar>
    )
}