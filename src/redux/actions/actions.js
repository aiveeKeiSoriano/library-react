import axios from "axios";
import { SET_ERROR, TOGGLE_DRAWER, TOGGLE_LOADING } from "./action_types";


export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER
})

export const toggleLoading = () => ({
    type: TOGGLE_LOADING
})

export const setError = (str) => ({
    type: SET_ERROR,
    payload: str
})

export const login = (obj) => {
    return async (dispatch) => {
        dispatch(toggleLoading)
        try {
            let response = axios.post('/auth/login', JSON.stringify(obj), {
                headers: {
                "Content-Type" : "application/json"
                }
            })
            let result = response.data
            if (response.status === 200) {
                localStorage.setItem("access_token", result.access_token)
                localStorage.setItem("refresh_token", result.refresh_token)
                dispatch(setError(''))
            }
        }
        catch (e) {
            dispatch(setError(e.message))
        }
        dispatch(toggleLoading)
    }
}