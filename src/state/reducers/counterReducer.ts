import { CounterState } from '../../model/stateModel';
import { INCREMENT_COUNTER } from '../actions/types';

const initialState: CounterState = {
    counter: 0,
}

export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state, counter: state.counter + 1
            };
        default:
            return state;
    }
}