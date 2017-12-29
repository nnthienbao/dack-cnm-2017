import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom";

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import store from './store';
import ScrollToTop from "./components/ScrollToTop";

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
