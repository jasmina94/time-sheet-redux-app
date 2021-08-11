import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {}
const enhancers = []
const middleware = [logger, thunk];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = ((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()) || compose;
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension)
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

export const store = createStore(rootReducer, initialState, composedEnhancers);

export const persistor = persistStore(store);

export default { store, persistor };