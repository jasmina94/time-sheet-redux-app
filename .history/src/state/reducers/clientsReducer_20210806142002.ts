import { TabState } from '../../model/stateModel';
import { FETCH_CLIENTS } from '../actions/types';

const initialState: TabState = {
    currentPage: 1,
    dataPerPage: 3,
    data: [],
    dataLoaded: false,
    searchLetter: '',
    searchTerm: ''
};

export default function clientsReducer(state = initialState, action: any) {
    switch(action.type) {
        case FETCH_CLIENTS:
            return {
                ...state,
                
            };
        default:
            return state;
    }
}