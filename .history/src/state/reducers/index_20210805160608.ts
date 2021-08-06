import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

export default const rootReducer = () => combineReducers({
    counterState: counterReducer
});