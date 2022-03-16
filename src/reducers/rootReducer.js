import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import getWardDataReducer from "./getWardDataReducer";

export default combineReducers({
    form : formReducer,
    warddata : getWardDataReducer
});