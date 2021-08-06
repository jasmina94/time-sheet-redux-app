import { INCREMENT_COUNTER } from './types';

export const incrementCounter = () => (dispatch: any) => {
    dispatch({
        type: INCREMENT_COUNTER,
        payload: {}
    });
};