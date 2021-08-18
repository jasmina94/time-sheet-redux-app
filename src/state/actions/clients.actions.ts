import { searchService } from '../../services/search.service';
import { clientsService } from '../../services/clients.service';
import {
    CREATE_CLIENT, CREATE_CLIENT_SUCCESS,
    DELETE_CLIENT, FETCH_CLIENTS, FETCH_CLIENTS_SUCCESS,
    UPDATE_CLIENT, UPDATE_CLIENT_SUCCESS,
    FAILURE_MESSAGE, SUCCESS_MESSAGE    
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
                dispatch({
                    type: FAILURE_MESSAGE,
                    payload: { message: err }
                });
            });
    }, 1000);
};

export const createClient = (client: Client, refreshCallback: any) => (dispatch: any) => {
    dispatch({
        type: CREATE_CLIENT,
        payload: {
            newClient: client
        }
    });
    setTimeout(() => {
        clientsService.create(client)
            .then(res => {
                dispatch({
                    type: CREATE_CLIENT_SUCCESS,
                    payload: {
                        client: res.data
                    }
                });
                dispatch({
                    type: SUCCESS_MESSAGE,
                    payload: { message: 'Successfully created new client!' }
                });
                refreshCallback();
            })
            .catch(err => {
                dispatch({
                    type: FAILURE_MESSAGE,
                    payload: { message: err }
                });
            })
    }, 2000);
};

export const updateClient = (client: Client, refreshCallback: any) => (dispatch: any) => {
    dispatch({ type: UPDATE_CLIENT });
    clientsService.update(client)
        .then(res => {
            dispatch({
                type: UPDATE_CLIENT_SUCCESS,
                payload: {
                    client: res.data
                }
            });
            dispatch({
                type: SUCCESS_MESSAGE,
                payload: { message: `Successfully updated client with id: ${client.id}` }
            });
            refreshCallback();
        })
        .catch(err => {
            dispatch({
                type: FAILURE_MESSAGE,
                payload: { message: err }
            })
        });
};

export const deleteClient = (id: number) => (dispatch: any) => {
    dispatch({ type: DELETE_CLIENT, payload: { clientId: id } });
    clientsService.remove(id)
        .then(res => {
            dispatch({
                type: SUCCESS_MESSAGE,
                payload: { message: `Deleted client with id: ${id}.` }
            });
        })
        .catch(err => {
            dispatch({
                type: FAILURE_MESSAGE,
                payload: { message: err }
            })
        });
};
