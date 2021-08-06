export interface CounterState {
    counter: number;
}

export interface TabState {
    currentPage: number,
    dataPerPage: number,
    searchLetter: string,
    searchTerm: string
    data: []
    dataLoaded: boolean
}

export interface AppState {
    clients: []
}