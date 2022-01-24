// import { combineReducers } from "redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import thunkMiddleware from "redux-thunk";
// import { IncrementReducer } from "../reducers/Reducer";

// const rootReducer = combineReducers({
//   IncrementStore: IncrementReducer,
// });
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const allStore = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunkMiddleware))
// );

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist"; // imports from redux-persist
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunkMiddleware from "redux-thunk";
import { IncrementReducer, ListReducer, ProductReducer, TestReducer } from "../reducers/Reducer";
import { saveState } from "./localStorage";


const persistConfig = {
  key: "storeData",
  storage: storage,
};
const rootReducer = combineReducers({
  ProductStore: ProductReducer,
  ListStore: ListReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  // applyMiddleware(thunkMiddleware)
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
store.subscribe(() => {
  saveState({
    todos: store.getState().ProductStore.storeData,
  });
});
const persistor = persistStore(store);
export { store, persistor };
