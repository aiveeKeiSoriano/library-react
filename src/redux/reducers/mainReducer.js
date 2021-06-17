import { SET_ERROR, TOGGLE_DRAWER, TOGGLE_LOADING } from "../actions/action_types";

const initialState = {
    drawer: false,
    loading: false,
    error: ''
}

export default function MainReducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_DRAWER:
            return { ...state, drawer: !state.drawer }
        case TOGGLE_LOADING:
            return { ...state, loading: !state.loading }
        case SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
