import { applyMiddleware } from '@reduxjs/toolkit';
import {createStore} from 'redux';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const appStore = createStore(
    rootReducer,
    initialState,
    compose (
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default appStore;
