import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './adapter';
import App from './App';

function createStore() {
    return configureStore({ reducer });
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={createStore()}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
