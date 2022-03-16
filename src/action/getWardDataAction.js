import { ApiConfig } from "./config";

export const setUserDetails = (ward) => async(dispatch) => {
    await ApiConfig.post("/getdata", {"ward" : ward})
    .then(res => {
        dispatch({
            type : "SET_DATA",
            payload : res.data
        });
    })
};