import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user.reducer';
import clientReducer from './clients.reducer';
import projectReducer from './projects.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer', 'clientReducer', 'projectReducer']
}

const rootReducer = combineReducers({
    userReducer,
    clientReducer,
    projectReducer
});

export default persistReducer(persistConfig, rootReducer);