import { INCREMENT_COUNTER } from "./types";

export const incrementCounter = () => (dispatch: any) => {
    console.log('Incrementing the counter...');
    dispatch({
        type: INCREMENT_COUNTER,
        payload: {}
    });
};