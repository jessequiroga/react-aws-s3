import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import handleActions from './reducer/upload';

const rootReducer = combineReducers({
    handleActions
});

export const ConfigureStore = () => {
    const store = createStore(rootReducer,
        applyMiddleware(logger)
    );

    return store;
}

export default ConfigureStore;
export type RootState = ReturnType<typeof rootReducer>;



