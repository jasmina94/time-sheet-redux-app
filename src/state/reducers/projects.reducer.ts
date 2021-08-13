import { TabState } from '../state.model';
import { FETCH_PROJECTS, FETCH_PROJECTS_SUCCESS } from '../actions/types';
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
        item: {},
        toggle: false
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

export default function projectReducer(state = initState, action: any) {
    switch (action.type) {
        case FETCH_PROJECTS:
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
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                dataState: {
                    data: action.payload.projects,
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
