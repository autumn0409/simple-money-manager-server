import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import { category, newCategoryForm } from './states/category-reducers';
import {
    recordDetail,
    editRecordForm,
    newRecordForm,
    recordSelected,
    month,
    year,
    record,
} from './states/record-reducers';
import { chart } from './states/chart-reducers';

import App from './containers/App';

import 'bootstrap/dist/css/bootstrap.css';

window.onload = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        month, year, record, recordSelected, recordDetail, editRecordForm, newRecordForm,
        category, newCategoryForm,
        chart,
    }), composeEnhancers(applyMiddleware(thunkMiddleware)));

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}