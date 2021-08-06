import { AppState } from '../../model/stateModel';
import { FETCH_CLIENTS } from '../actions/types';

const initialState: AppState = {
    clients: []
};

export default function clientsReducer(state = initialState, action: any) {
    switch(action.type) {
        case FETCH_CLIENTS:
            return {
                ...state,
                clients: action.payload
            };
        default:
            return state;
    }
}