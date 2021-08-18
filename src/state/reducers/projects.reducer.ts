import { FETCH_CUSTOMERS, FETCH_CUSTOMERS_SUCCESS, FETCH_LEADERS, FETCH_LEADERS_SUCCESS, FETCH_PROJECTS, FETCH_PROJECTS_SUCCESS } from '../actions/types';
import { PaginationDefaultCongif } from '../../components/shared/Pagination';

export const initState: any = {
    tabState: {
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
                status: 0,
                description: '',
                customer: 0,
                lead: 0
            }
        }
    },
    leadOptions: [],
    customerOptions: []
};

export default function projectReducer(state = initState, action: any) {
    switch (action.type) {
        case FETCH_PROJECTS:
            return {
                ...state,
                tabState: {
                    dataState: {
                        ...state.tabState.dataState,
                        loading: true,
                        loaded: false
                    },
                    pagingState: {
                        ...state.tabState.pagingState,
                        currentPage: action.payload.requestedPage,
                        dataPerPage: action.payload.requestedDataPerPage,
                    },
                    searchState: {
                        ...state.tabState.searchState,
                        term: action.payload.requestedSearchTerm
                    }
                }
            };
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                tabState: {
                    dataState: {
                        data: action.payload.projects,
                        loading: false,
                        loaded: true,
                        total: action.payload.total,
                    },
                    pagingState: {
                        ...state.tabState.pagingState,
                        numberOfPages: action.payload.numOfPages,
                    },
                    searchState: {
                        ...state.tabState.searchState
                    }
                }
            }
        case FETCH_CUSTOMERS:
            return {
                ...state
            }
        case FETCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                tabState: { ...state.tabState },
                customerOptions: action.payload.customerOptions
            }
        case FETCH_LEADERS:
            return {
                ...state
            }
        case FETCH_LEADERS_SUCCESS:
            return {
                ...state,
                tabState: { ...state.tabState },
                leadOptions: action.payload.leadersOptions
            }
        default:
            return state;
    }
}
