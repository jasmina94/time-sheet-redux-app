import { createStore, compose, applyMiddleware} from 'redux';
import { AppState } from '../model/model';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState: AppState = {
    counterState: {
        counter: 0,
    }
};

//Redux Thunk is middleware that allows you to return functions, rather than just actions. Enables using dispatch
const middleware = [thunk];

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const appStore = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        composeEnhancers
    )
);

export default appStore;
