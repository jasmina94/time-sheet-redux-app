import { searchService } from '../../services/search.service';
import { clientsService } from '../../services/clients.service';
import { FETCH_CLIENTS, FETCH_CLIENTS_FAILURE, FETCH_CLIENTS_SUCCESS } from './types';

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


