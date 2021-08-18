import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import uiReducer from './ui.reducer';
import userReducer from './user.reducer';
import clientReducer from './clients.reducer';
import projectReducer from './projects.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer', 'clientReducer', 'projectReducer', 'uiReducer']

}

const rootReducer = combineReducers({
    uiReducer,
    userReducer,
    clientReducer,
    projectReducer
});

export default persistReducer(persistConfig, rootReducer);