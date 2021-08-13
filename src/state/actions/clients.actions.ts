import { searchService } from '../../services/search.service';
import { clientsService } from '../../services/clients.service';
import {
    CREATE_CLIENT, CREATE_CLIENT_FAILURE, CREATE_CLIENT_SUCCESS,
    DELETE_CLIENT, DELETE_CLIENT_FAILURE,
    DELETE_CLIENT_SUCCESS,
    FETCH_CLIENTS, FETCH_CLIENTS_FAILURE, FETCH_CLIENTS_SUCCESS,
    UPDATE_CLIENT, UPDATE_CLIENT_FAILURE, UPDATE_CLIENT_SUCCESS
} from './types';
import { Client } from '../../model/model';

export const fetchClients = (page: number, perPage: number, term: string = '', letter: string = '') => (dispatch: any) => {
    dispatch({
        type: FETCH_CLIENTS,
        payload: {
            requestedPage: page,
            requestedSearchTerm: term,
            requestedDataPerPage: perPage
        }
    });
    setTimeout(() => {
        let action = null;
        if (letter === '') {
            action = clientsService.readBy(page, perPage, term);
        } else {
            action = searchService.searchByLetter(page, perPage, 'clients', letter);
        }

        action
            .then(res => dispatch({
                type: FETCH_CLIENTS_SUCCESS,
                payload: {
                    total: res.total,
                    clients: res.data,
                    numOfPages: res.numOfPages
                }
            }))
            .catch(err => {
                console.log(err);
                dispatch({
                    type: FETCH_CLIENTS_FAILURE,
                    payload: { err }
                })
            });
    }, 1000);
};

export const createClient = (client: Client) => (dispatch: any) => {
    dispatch({
        type: CREATE_CLIENT,
        payload: {
            newClient: client
        }
    });
    clientsService.create(client)
        .then(res => {
            console.log('success: ' + res.data);
            dispatch({
                type: CREATE_CLIENT_SUCCESS,
                payload: {
                    client: res.data
                }
            })
        })
        .catch(err => {
            dispatch({
                type: CREATE_CLIENT_FAILURE,
                payload: { err }
            })
        })
};

export const updateClient = (client: Client) => (dispatch: any) => {
    dispatch({ type: UPDATE_CLIENT })
    clientsService.update(client)
        .then(res => dispatch({
            type: UPDATE_CLIENT_SUCCESS,
            payload: {
                client: res.data
            }
        }))
        .catch(err => {
            console.log(err);
            dispatch({
                type: UPDATE_CLIENT_FAILURE,
                payload: { err }
            })
        });
};

export const deleteClient = (id: number) => (dispatch: any) => {
    dispatch({ type: DELETE_CLIENT, payload: { clientId: id } });
    clientsService.remove(id)
        .then(res => {
            dispatch({
                type: DELETE_CLIENT_SUCCESS,
                payload: { res }
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: DELETE_CLIENT_FAILURE,
                payload: { err }
            })
        });
};
