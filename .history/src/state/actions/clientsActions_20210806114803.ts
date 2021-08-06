import { FETCH_CLIENTS } from './types';

export const incrementCounter = () => (dispatch: any) => {
    dispatch({
        type: FETCH_CLIENTS,
        payload: {}
    });
};