import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import {ListReducer, ProductReducer } from "../reducers/Reducer";

const rootReducer = combineReducers({
  ProductStore: ProductReducer,
  ListStore: ListReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const allStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
