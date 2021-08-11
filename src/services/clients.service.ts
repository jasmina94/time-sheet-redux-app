import { Client } from '../model/model';
import { tokenHelper } from '../_helpers/tokenHelper';
import { handleResponse } from '../_helpers/responseHandler';
import { CLIENTS_PATH, getReadPath } from '../_helpers/pathHelper';

export const clientsService = {
    create,
    read,
    readBy,
    update,
    remove
}

function create(client: Client) {
    const requestOptions: any = {
        method: 'POST',
        headers: { ...tokenHelper.getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: client.name, address: client.address, city: client.city, zip: client.zip, country: client.country })
    };

    return fetch(CLIENTS_PATH, requestOptions)
        .then(handleResponse)
        .then(response => {
            return { success: true, data: response.data, error: '' };
        });
}

function read() {
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    return fetch(CLIENTS_PATH + '/all', requestOptions)
        .then(handleResponse)
        .then(response => { return response.data });
}

function readBy(page: number, perPage: number, term: string) {
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    const path = getReadPath('clients', page, perPage, term);
    return fetch(path, requestOptions)
        .then(handleResponse)
        .then(response => { return response });
}

function update(client: Client) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { ...tokenHelper.getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: client.name, address: client.address, city: client.city, zip: client.zip, country: client.country })
    };
    return fetch(CLIENTS_PATH + '/' + client.id, requestOptions)
        .then(handleResponse)
        .then(response => { return response.data });
}

function remove(clientId: number) {
    let requestOptions: any = { method: 'DELETE', headers: tokenHelper.getAuthHeader() };
    return fetch(CLIENTS_PATH + '/' + clientId, requestOptions)
        .then(handleResponse)
        .then(response => { return response.data });
}