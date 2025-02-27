import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import {store} from "./Redux/configureStore";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
                <App/>
        </PersistGate>
            </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
