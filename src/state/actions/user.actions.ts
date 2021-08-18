import { history } from '../../_helpers/historyHelper';
import { authService } from '../../services/authentication.service';
import { FAILURE_MESSAGE, LOGIN_REQUEST, LOGIN_REQUEST_FAILURE, LOGIN_REQUEST_SUCCESS, LOGOUT, SUCCESS_MESSAGE } from './types';

export const loginUser = (email: string, password: string, remember: boolean) => (dispatch: any) => {
    dispatch({ type: LOGIN_REQUEST, payload: email });

    authService.login(email, password, remember)
        .then(res => {
            dispatch({
                type: LOGIN_REQUEST_SUCCESS,
                payload: {
                    token: res.token
                }
            });
            dispatch({
                type: SUCCESS_MESSAGE,
                payload: { message: 'Welcome!' }
            });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: LOGIN_REQUEST_FAILURE,
                payload: { err }
            });
            dispatch({
                type: FAILURE_MESSAGE,
                payload: { message: err }
            });
        });
}

export const logoutUser = () => (dispatch: any) => {
    dispatch({
        type: LOGOUT,
        payload: {}
    });
    authService.logout();
    history.push('/');
}