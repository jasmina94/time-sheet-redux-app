interface CounterState {
    counter: number;
    loaded: boolean;
}

export interface AppState {
    counterState: CounterState;
}