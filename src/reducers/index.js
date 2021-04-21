import { combineReducers } from 'redux'
import { createStore } from "redux";
import reducer from "./fligthsReducer";

const rootReducer = combineReducers({
    reducer
})

export const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());