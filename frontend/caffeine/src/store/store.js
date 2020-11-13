import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';

import groupReducer from './reducers/groups';
import studyReducer from './reducers/study';
import userReducer from './reducers/user';
import subjectReducer from './reducers/subjects';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    group: groupReducer,
    study: studyReducer,
    user: userReducer,
    subject: subjectReducer,
    router: connectRouter(history)
});

export const middlewares = [thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares)));

export default store;
