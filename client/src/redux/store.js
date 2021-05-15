import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import rootreducer from './rootreducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import authExtraReducer from './extraReducer/authExtraReducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

export default configureStore(
  {
    reducer: {
      rootreducer: rootreducer,
      errorReducer: errorReducer,
      authReducer: authReducer,
      authExtraReducer: authExtraReducer,
    },
  },
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
