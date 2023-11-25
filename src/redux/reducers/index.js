import { combineReducers } from 'redux';
import { userReducer } from './eventReducer.js';

const reducers = combineReducers({
    allEvents: userReducer,
});
export default reducers;
