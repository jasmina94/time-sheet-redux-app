import { CLEAR_MESSAGE, FAILURE_MESSAGE, INFO_MESSAGE, SUCCESS_MESSAGE } from './types';

export const showSuccessMessage = (message: string) => (dispatch: any) => {
    dispatch({
        type: SUCCESS_MESSAGE,
        payload: { message}
    });
}

export const showFailureMessage = (message: string) => (dispatch: any) => {
    dispatch({
        type: FAILURE_MESSAGE,
        payload: { message}
    });
}

export const showInfoMessage = (message: string) => (dispatch: any) => {
    dispatch({
        type: INFO_MESSAGE,
        payload: { message}
    });
}

export const clearMessage = () => (dispatch: any) => {
    dispatch({
        type: CLEAR_MESSAGE,
    });
}