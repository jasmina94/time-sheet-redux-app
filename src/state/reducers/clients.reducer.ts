import { TabState } from '../state.model';
import { FETCH_CLIENTS, FETCH_CLIENTS_SUCCESS } from '../actions/types';
import { PaginationDefaultCongif } from '../../components/shared/Pagination';

export const initState: TabState = {
    dataState: {
        data: [],
        loaded: false,
        loading: false,
        total: 0
    },
    searchState: {
        letter: '',
        term: '',
    },
    pagingState: {
        currentPage: PaginationDefaultCongif.page,
        dataPerPage: PaginationDefaultCongif.limit,
        numberOfPages: PaginationDefaultCongif.numOfPages
    }
};

export default function clientReducer(state = initState, action: any) {
    switch (action.type) {
        case FETCH_CLIENTS:
            return {
                ...state,
                dataState: { 
                    ...state.dataState,
                    loading: true, 
                    loaded: false
                },
                pagingState: {
                    ...state.pagingState,
                    currentPage: action.payload.requestedPage,
                    dataPerPage: action.payload.requestedDataPerPage,
                },
                searchState: {
                    ...state.searchState,
                    term: action.payload.requestedSearchTerm
                }
            };
        case FETCH_CLIENTS_SUCCESS:
            return {
                ...state,
                dataState: {
                    data: action.payload.clients,
                    loading: false,
                    loaded: true,
                    total: action.payload.total,
                },
                pagingState: {
                    ...state.pagingState,
                    numberOfPages: action.payload.numOfPages,
                },
                searchState: {
                    ...state.searchState
                }
            }
        default:
            return state;
    }
}