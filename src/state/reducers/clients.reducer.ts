import { TabState } from '../state.model';
import { CREATE_CLIENT, CREATE_CLIENT_FAILURE, CREATE_CLIENT_SUCCESS, DELETE_CLIENT, DELETE_CLIENT_FAILURE, FETCH_CLIENTS, FETCH_CLIENTS_SUCCESS } from '../actions/types';
import { PaginationDefaultCongif } from '../../components/shared/Pagination';

export const initState: TabState = {
    actionInProgress: false,
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
        toggle: false,
        item: {
            name: '',
            address: '',
            city: '',
            zip: '',
            country: ''
        }
    },
    activeItem: {
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
                    toggle: true
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
                    toggle: false,
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
        case CREATE_CLIENT_FAILURE:
            return {
                ...state,
                newItem: {
                    ...state.newItem,
                    error: action.payload.err,
                },
                dataState: { ...state.dataState },
                pagingState: { ...state.pagingState },
                searchState: { ...state.searchState }
            }
        case DELETE_CLIENT:
            console.log('Deleting client with id: ' + action.payload.clientId);
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
        case DELETE_CLIENT_FAILURE:
            console.log('Failure deleting client: ' + action.payload.err)
            return {
                ...state,
                dataState: { ...state.dataState },
                pagingState: { ...state.pagingState },
                searchState: { ...state.searchState }
            }
        default:
            return state;
    }
}