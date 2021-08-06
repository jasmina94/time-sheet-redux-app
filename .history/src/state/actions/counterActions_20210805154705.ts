import { INCREMENT_COUNTER } from "./types";

export const incrementCounter = () => dispatch => {
    console.log('Incrementing the counter...');
    dispatch({
        type: INCREMENT_COUNTER,
        payload: 1 //TODO: FIX
    });
};