import {
  createStore,
  combineReducers,
  compose,
  Store,
  applyMiddleware
} from "redux";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import handleActions from "./reducers/upload";
import epics from "./epics";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

const rootReducer = combineReducers({
  handleActions
});

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const epicMiddleware = createEpicMiddleware();

function configureStore(initialState?: RootState): Store {
  const middleware = [epicMiddleware, logger];
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore();
export { store as default };

epicMiddleware.run(epics as any);
