import { getReadPath } from '../../helpers/pathHelper';
import { handleResponse } from '../../helpers/responseHandler';
import { FETCH_CLIENTS } from './types';

export const fetchClient = (page: number, perPage: number, term: string = '') => (dispatch: any) => {
    const requestOptions: any = { method: 'GET' };
    const path = getReadPath('clients', page, perPage, term);
    fetch(path, requestOptions)
        .then(handleResponse)
        .then(res => dispatch({
            type: FETCH_CLIENTS,
            payload: {
                clients: res.clients,

            }
        }));
    
};