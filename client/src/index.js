import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "mobx-react";
import { BrowserRouter as Router } from "react-router-dom";

// Stores
import authStore from "./stores/authStore";
import userStore from "./stores/userStore";
import globalStore from "./stores/globalStore";
import customerStore from "./stores/customerStore";
import supplierStore from "./stores/supplierStore";
import companyStore from "./stores/companyStore";
import taxStore from "./stores/taxStore";
import roleStore from "./stores/roleStore";
import stockStore from "./stores/stockStore";

const stores = {
    authStore,
    userStore,
    globalStore,
    customerStore,
    supplierStore,
    companyStore,
    taxStore,
    roleStore,
    stockStore,
};

ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
