import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import MainReducer from "./reducers/mainReducer";

let rootReducer = combineReducers({main: MainReducer})

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store