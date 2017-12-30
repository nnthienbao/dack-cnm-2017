import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import flashMessageReducer from './reducers/flashMessageReducer';

export default createStore(
    combineReducers({
        auth: authReducer,
        flashMessage: flashMessageReducer
    }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)