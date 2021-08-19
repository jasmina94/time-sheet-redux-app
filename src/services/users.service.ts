import { tokenHelper } from '../_helpers/tokenHelper';
import { handleResponse } from '../_helpers/responseHandler';
import { USERS_PATH, RESET_PASSWORD_PATH, CHANGE_PASSWORD_PATH } from '../_helpers/pathHelper';
import { CHANGE_PASSWORD_REQUEST } from '../state/actions/types';

export const userService = {
    getAll,
    resetPassword,
    changePassword
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
        .then(response => { return response.password });
}

function changePassword(currentPassword: string, newPassword: string, repeat: string) {
    const requestOptions: any = {
        method: 'POST',
        headers: { ...tokenHelper.getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ current: currentPassword, new: newPassword, repeat: repeat })
    };
    
    return fetch(CHANGE_PASSWORD_PATH, requestOptions)
        .then(handleResponse)
        .then(response => { return response.message });
}