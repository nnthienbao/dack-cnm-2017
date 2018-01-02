import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import flashMessageReducer from './reducers/flashMessageReducer';
import userReducer from './reducers/userReducer';

export default createStore(
    combineReducers({
        auth: authReducer,
        flashMessage: flashMessageReducer,
        user: userReducer
    }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)