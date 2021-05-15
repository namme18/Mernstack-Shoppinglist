import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
  name: 'authReducer',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: null,
    user: null,
  },
  reducers: {
    userLoading: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    userLoaded: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    registerSuccess: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    authError: state => {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    },
    loginFail: state => {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    },
    logoutSuccess: state => {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    },
    registerFail: state => {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    },
    default: state => {
      return {
        ...state,
      };
    },
  }
});

export const {
  userLoading,
  userLoaded,
  loginSuccess,
  registerSuccess,
  authError,
  logoutSuccess,
  loginFail,
  registerFail,
} = authReducer.actions;
export default authReducer.reducer;
