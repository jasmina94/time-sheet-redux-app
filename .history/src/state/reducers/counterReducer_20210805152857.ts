import { CounterState } from '../../model/model';

const initialState: CounterState = {
    counter: 0,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            console.log('counter reducer INCREMENT');
            return {
                ...state, counter: action.payload
            };
        default:
            return state;
    }
}