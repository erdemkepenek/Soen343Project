import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AdminReducer from './reducers/adminReducer'
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'

const reducers = combineReducers({
    AdminReducer,
});
const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
