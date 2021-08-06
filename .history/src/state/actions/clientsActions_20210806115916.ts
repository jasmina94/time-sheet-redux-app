import { FETCH_CLIENTS } from './types';

export const fetchClient = (page: number, perPage: number, term: string = '') => (dispatch: any) => {
    fetch()
    dispatch({
        type: FETCH_CLIENTS,
        payload: {}
    });
};