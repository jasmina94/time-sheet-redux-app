import { Client, User, UserSessionInfo } from '../model/model';

export interface UIState {
    openSuccess: boolean,
    openFailure: boolean,
    openInfo: boolean,
    successMessage: string,
    failureMessage: string,
    infoMessage: string
}
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

export interface NewItemState {
    item: object,
    error: string,
}

export interface TabState {
    dataState: DataState,
    pagingState: PagingState,
    searchState: SearchState,
    newItem: NewItemState,
}

export interface ProjectState {
    tabState: TabState,
    leadOptions: any[],
    customerOptions: any[]
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