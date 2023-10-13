import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { userReducer } from "./reducers/userReducer/userReducer";
import { toDosListReducer } from "./reducers/toDoListReducer/toDosListReducer";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
  toDos: toDosListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof store.getState>;
