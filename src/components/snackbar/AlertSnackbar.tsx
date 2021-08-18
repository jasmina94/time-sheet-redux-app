import Alert, { Color } from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar';
import { clearMessage } from '../../state/actions/ui.actions';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

export default function AlertSnackbar() {
    const dispatch = useAppDispatch();
    const openInfo = useAppSelector(state => state.uiReducer.openInfo);
    const openFailure = useAppSelector(state => state.uiReducer.openFailure);
    const openSuccess = useAppSelector(state => state.uiReducer.openSuccess);
    const infoMessage = useAppSelector(state => state.uiReducer.infoMessage);
    const failureMessage = useAppSelector(state => state.uiReducer.failureMessage);
    const successMessage = useAppSelector(state => state.uiReducer.successMessage);

    const handleClose = () => { dispatch(clearMessage()); }

    const shouldOpen = () => { return openInfo || openFailure || openSuccess; }
   
    const messageToShow = () => {
        if (openInfo) {
            return infoMessage;
        } else if (openFailure) {
            return failureMessage;
        } else if (openSuccess) {
            return successMessage;
        }
    }

    const severity = () => {
        let severity: Color = 'info';
        if (openInfo) {
            severity = 'info';
        } else if (openFailure) {
            severity = 'error';
        } else if (openSuccess) {
            severity = 'success';
        }
        return severity;
    }

    return (
        <Snackbar open={shouldOpen()} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity()}>
                {messageToShow()}
            </Alert>
        </Snackbar>
    )
}