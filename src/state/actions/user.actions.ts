import { history } from '../../_helpers/historyHelper';
import { userService } from '../../services/user.service';
import { LOGIN_REQUEST, LOGIN_REQUEST_FAILURE, LOGIN_REQUEST_SUCCESS, LOGOUT } from './types';

export const loginUser = (email: string, password: string, remember: boolean) => (dispatch: any) => {
    dispatch({ type: LOGIN_REQUEST, payload: email});
    userService.login(email, password, remember)
        .then(res => {
            dispatch({
                type: LOGIN_REQUEST_SUCCESS,
                payload: {
                    token: res.token
                }
            });
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: LOGIN_REQUEST_FAILURE,
                payload: {}
            });
        });
}

export const logoutUser = () => (dispatch: any) => {
    dispatch({
        type: LOGOUT,
        payload: {}
    });
    userService.logout();
    history.push('/');
}