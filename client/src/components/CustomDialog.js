import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import theme from '../Theme';

function CustomDialog(props) {

    const { title, description, confirmButton, alertOpen, setAlertOpen, callbackFunction } = props;

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
                    {title}
                </DialogTitle>

                <DialogContent sx={{ textAlign: "justify" }}>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button color="blue" sx={{ marginRight: 2 }} onClick={() => setAlertOpen(false)}>Back</Button>
                    <Button color="blue" onClick={callbackFunction} autoFocus>{confirmButton}</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

export default CustomDialog;