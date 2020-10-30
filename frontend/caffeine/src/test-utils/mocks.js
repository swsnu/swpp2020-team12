import { createStore, combineReducers, applyMiddleware, compose } from 'redux';                                       
import { connectRouter } from 'connected-react-router';

import { history, middlewares } from '../store/store';

const getMockgroupReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

export const getMockStore = (initialState) => {
  const mockgroupReducer = getMockgroupReducer(initialState);
  const rootReducer = combineReducers({
    group: mockgroupReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
}


