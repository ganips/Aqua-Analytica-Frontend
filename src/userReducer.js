import { SET_USERS } from './keys.js';

export default (state = { }, action) => {
    switch(action.type){
        case SET_USERS : 
            return { ...state, user_details : action.payload }
        default:
            return state;
    }
}