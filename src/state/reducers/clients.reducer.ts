import { TabState } from '../state.model';
import {
    CREATE_CLIENT, CREATE_CLIENT_SUCCESS,
    DELETE_CLIENT, UPDATE_CLIENT,
    FETCH_CLIENTS, FETCH_CLIENTS_SUCCESS
} from '../actions/types';
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
    },
    newItem: {
        error: '',
        item: {
            name: '',
            address: '',
            city: '',
            zip: '',
            country: ''
        }
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
                    dataPerPage: action.payload.requestedy
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
        case CREATE_CLIENT:
            return {
                ...state,
                newItem: {
                    item: {
                        name: action.payload.newClient.name,
                        address: action.payload.newClient.address,
                        city: action.payload.newClient.city,
                        zip: action.payload.newClient.zip,
                        country: action.payload.newClient.country
                    },
                    error: '',
                },
                dataState: { ...state.dataState },
                pagingState: { ...state.pagingState },
                searchState: { ...state.searchState }
            }
        case CREATE_CLIENT_SUCCESS:
            return {
                ...state,
                newItem: {
                    error: '',
                    item: {
                        name: '',
                        address: '',
                        city: '',
                        zip: '',
                        country: ''
                    }
                },
                dataState: { ...state.dataState },
                pagingState: { ...state.pagingState },
                searchState: { ...state.searchState }
            }
        case UPDATE_CLIENT:
            return {
                ...state,
                dataState: {
                    ...state.dataState,
                    loading: true,
                    loaded: false
                },
                pagingState: {
                    ...state.pagingState
                },
                searchState: {
                    ...state.searchState
                }
            }
        case DELETE_CLIENT:
            return {
                ...state,
                dataState: {
                    ...state.dataState,
                    loading: true,
                    loaded: false
                },
                pagingState: {
                    ...state.pagingState
                },
                searchState: {
                    ...state.searchState
                }
            }
        default:
            return state;
    }
}