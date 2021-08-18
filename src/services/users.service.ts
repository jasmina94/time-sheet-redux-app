import { tokenHelper } from '../_helpers/tokenHelper';
import { handleResponse } from '../_helpers/responseHandler';
import { USERS_PATH, RESET_PASSWORD_PATH } from '../_helpers/pathHelper';

export const userService = {
    getAll,
    resetPassword,
};

function getAll() {
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    return fetch(USERS_PATH, requestOptions)
        .then(handleResponse)
        .then(response => { return response.data; });
}

function resetPassword(email: string) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
    };

    return fetch(RESET_PASSWORD_PATH, request)
        .then(handleResponse)
        .then(response => {
            return { success: true, error: '', data: response.password }
        })
        .catch(error => {
            return { success: false, error: error, data: {} }
        });
}