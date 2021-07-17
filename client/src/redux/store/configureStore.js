import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import agendasReducer from "../reducers/agendasReducer";
import roomsReducer from "../reducers/roomReducer";
import modals from "../reducers/modalReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(
  createStore
);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(
    combineReducers({
      user: userReducer,
      agandas: agendasReducer,
      rooms: roomsReducer,
      modal: modals,
    }),
    initialState
  );
  return store;
}
