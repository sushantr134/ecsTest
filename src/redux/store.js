import { combineReducers, compose, applyMiddleware, createStore } from "redux";
import booksReducer from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  booksStore: booksReducer
});

const configureStore = initialState => createStore(rootReducer, initialState, compose(applyMiddleware(thunk, logger)));

export default configureStore;
