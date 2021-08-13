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

export interface NewItemState {
    item: object,
    error: string,
    toggle: boolean
}

export interface ItemState {
    item: object,
    error: string
}
export interface TabState {
    actionInProgress: boolean,
    dataState: DataState,
    pagingState: PagingState,
    searchState: SearchState,
    newItem: NewItemState,
    activeItem: ItemState
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