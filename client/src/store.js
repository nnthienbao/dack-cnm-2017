import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import flashMessageReducer from './reducers/flashMessageReducer';

export default createStore(
    combineReducers({
        user: userReducer,
        flashMessage: flashMessageReducer
    }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)