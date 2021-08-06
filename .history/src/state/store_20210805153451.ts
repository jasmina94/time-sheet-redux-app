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

const appStore = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default appStore;