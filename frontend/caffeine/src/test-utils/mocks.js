import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {connectRouter} from 'connected-react-router';

import {history, middlewares} from '../store/store';

const getMockGroupReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockSubjectReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockUserReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockStudyReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockStatisticReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

const getMockRankReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

export const getMockStore = (initialState) => {
    const mockGroupReducer = getMockGroupReducer(initialState);
    const mockStudyReducer = getMockStudyReducer(initialState);
    const mockUserReducer = getMockUserReducer(initialState);
    const mockSubjectReducer = getMockSubjectReducer(initialState);
    const mockStatisticReducer = getMockStatisticReducer(initialState);
    const mockRankReducer = getMockRankReducer(initialState);
    const rootReducer = combineReducers({
        group: mockGroupReducer,
        subject: mockSubjectReducer,
        study: mockStudyReducer,
        user: mockUserReducer,
        rank: mockRankReducer,
        statistic: mockStatisticReducer,
        router: connectRouter(history),
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const mockStore = createStore(rootReducer,
        composeEnhancers(applyMiddleware(...middlewares)));
    return mockStore;
}


