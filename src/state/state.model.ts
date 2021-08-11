import { UserSessionInfo } from '../model/model';

export interface DataState {
    data: []
    loaded: boolean,
    loading: boolean,
    total: number,
}
export interface PagingState {
    currentPage: number,
    dataPerPage: number,
    numberOfPages: number
}

export interface SearchState {
    letter: string,
    term: string
}

export interface TabState {
    dataState: DataState,
    pagingState: PagingState,
    searchState: SearchState  
}

export interface UserState {
    loggingIn: boolean,
    loggedIn: boolean,
    userInfo: UserSessionInfo,
    ttl: number
}

export interface AppState {
    user: UserState,
    clients: TabState,
    projects: TabState
}