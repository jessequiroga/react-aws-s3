import {
  createStore,
  combineReducers,
  compose,
  Store,
  applyMiddleware
} from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import handleActions from "./reducers/upload";
import rootSaga from "./sagas";

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

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState?: RootState): Store {
  const middleware = [sagaMiddleware, logger];
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore();
export { store as default };

sagaMiddleware.run(rootSaga);
