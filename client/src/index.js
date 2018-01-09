import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import jwt_decode from 'jwt-decode';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import store from './store';
import ScrollToTop from "./components/ScrollToTop";
import setAuthorizationToken from './Utils/setAuthorizationToken';
import {setCurrentUser} from './actions/userAction';

if(localStorage.jwtToken) {
    const decode = jwt_decode(localStorage.jwtToken);
    if(decode.exp > new Date().getTime() / 1000 + 60) {
        setAuthorizationToken(localStorage.jwtToken);
        store.dispatch(setCurrentUser(decode));
    }

}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
