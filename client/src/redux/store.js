import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import rootreducer from './rootreducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

export default configureStore(
  {
    reducer: {
      rootreducer: rootreducer,
    },
  },
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
