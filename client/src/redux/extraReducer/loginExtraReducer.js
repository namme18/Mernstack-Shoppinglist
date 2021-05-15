import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginSuccess, loginFail } from '../authReducer';
import { getErrors } from '../errorReducer';

export const login = createAsyncThunk(
  'login',
  async ({ email, password }, { dispatch, getState, rejectWithValue }) => {
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    // Request body
    const body = JSON.stringify({ email, password });

    return axios.post('/api/auth', body, config)
      .then(res => {
        dispatch(loginSuccess(res.data));
        return res.data;
      })
      .catch(err => {
        const errData = {
          msg: err.response.data,
          status: err.response.status,
          id: 'LOGIN_FAIL',
        };
        dispatch(getErrors(errData));
        dispatch(loginFail());
        return rejectWithValue(errData);
      });
  }
);
