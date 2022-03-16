import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {store} from './reducers/store.js';
import App from './App';
import HeaderBar from './components/HeaderBar';

ReactDOM.render(
    <Provider store={store}>
		<App />
    </Provider>,
    document.getElementById('root')
);