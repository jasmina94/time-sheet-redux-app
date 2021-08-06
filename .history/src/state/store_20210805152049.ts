import { applyMiddleware } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import { AppState } from '../model/model';
import thunk from 'redux-thunk';

const initialState: AppState = {
    counterState: {
        counter: 0,
        loaded: false
    }
};
const middleware = [thunk];  //Redux Thunk is middleware that allows you to return functions, rather than just actions. Enables using dispatch

const appStore = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default appStore;
