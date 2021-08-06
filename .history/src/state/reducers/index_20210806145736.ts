import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import clientsReducer from './clientsReducer';

export default combineReducers({
    counterReducer
});