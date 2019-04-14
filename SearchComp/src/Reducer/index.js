import {combineReducers} from 'redux';
import searchResultReducer from './searchResultReducer';
export default combineReducers({
    searchResult:searchResultReducer
})