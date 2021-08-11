import { LOGIN_PATH } from "../_helpers/pathHelper";
import { handleResponse } from "../_helpers/responseHandler";

export const userService = {
    login,
    logout
}

function login(email: string, password: string, remember: boolean) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
    };
    return fetch(LOGIN_PATH, requestOptions)
        .then(handleResponse)
        .then(res => {
            localStorage.setItem('token', res.token);
            return res;
        });
}

function logout() {
    localStorage.clear();
}