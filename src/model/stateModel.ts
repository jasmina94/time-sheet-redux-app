export interface CounterState {
    counter: number;
}

export interface TabState {
    currentPage: number,
    dataPerPage: number,
    searchLetter: string,
    searchTerm: string
    data: []
    dataLoaded: boolean,
    numberOfPages: number
}

export interface AppState {
    clients: TabState,
    projects: TabState
}