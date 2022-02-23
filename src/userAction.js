import { SET_USERS } from "./keys";

export const setUserDetails = (user) => async(dispatch) => {
    dispatch({
        type : SET_USERS,
        payload : user
    });
}