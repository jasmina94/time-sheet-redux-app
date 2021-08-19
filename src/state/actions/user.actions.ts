import { history } from '../../_helpers/historyHelper';
import { authService } from '../../services/authentication.service';
import { CHANGE_PASSWORD_REQUEST, FAILURE_MESSAGE, FORGOT_PASSWORD_REQUEST, LOGIN_REQUEST, LOGIN_REQUEST_FAILURE, LOGIN_REQUEST_SUCCESS, LOGOUT, SUCCESS_MESSAGE } from './types';
import { userService } from '../../services/users.service';

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

export const resetPassword = (email: string) => (dispatch: any) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST, payload: { email } });
    userService.resetPassword(email)
        .then(res => {
            dispatch({
                type: SUCCESS_MESSAGE,
                payload: { message: `Your password is now reset to ${res}. Please login` }
            });
            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: FAILURE_MESSAGE,
                payload: { message: err }
            })
        })
}

export const changePassword = (current: string, newPass: string, repeatPass: string) => (dispatch: any) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    userService.changePassword(current, newPass, repeatPass)
        .then(res => {
            dispatch({
                type: SUCCESS_MESSAGE,
                payload: { message: res }
            });
            dispatch(logoutUser());
        })
        .catch(err => {
            dispatch({
                type: FAILURE_MESSAGE,
                payload: { message: err }
            })
        })
}

export const logoutUser = () => (dispatch: any) => {
    dispatch({
        type: LOGOUT,
        payload: {}
    });
    authService.logout();
    history.push('/');
}