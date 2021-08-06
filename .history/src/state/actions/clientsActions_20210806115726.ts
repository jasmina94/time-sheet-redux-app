import { FETCH_CLIENTS } from './types';

export const fetchClient = () => (dispatch: any) => {
    dispatch({
        type: FETCH_CLIENTS,
        payload: {}
    });
};