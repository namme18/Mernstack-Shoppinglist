import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authError, userLoaded, userLoading, registerSuccess, registerFail } from '../authReducer';
import { getErrors } from '../errorReducer';

export const getUser = createAsyncThunk('authExtraReducer/getUser', async (obj, {dispatch, getState}) => {
    
    //User loading
    dispatch(userLoading());

    return axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch(userLoaded(res.data))
            const token = localStorage.getItem('token')
            const data = {
                user: res.data,
                token: token
            }
            return data;
        })
        .catch(err => {
            const errorData = {
                msg: err.response.data,
                status: err.response.status,
                user:err.response.data,
                token: err.response.status,
            }
            dispatch(getErrors(errorData))
            dispatch(authError())
            return errorData;
        })
});

export const register = createAsyncThunk('authExtraReducer/register', async ({name, email, password}, {dispatch, getState}) => {
    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    //Request body
    const body = JSON.stringify({name, email, password});
     axios.post('/api/users', body, config)
        .then(res => {
            dispatch(registerSuccess(res.data))
        })
        .catch(err => {
            const errorData = {
                msg: err.response.data,
                status: err.response.status,
                id: 'REGISTER_FAIL'
            }
            dispatch(getErrors(errorData))
            dispatch(registerFail())
        })
});

export const tokenConfig = getState => {
    //Get token
    const token = getState().authReducer.token;

    //Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    //if token, add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export const authExtraReducer = createSlice({
    name: 'authExtraReducer',
    initialState: {
        token: null,
        user: null,
    },
    extraReducers: builder => {
        builder.addCase(getUser.pending, userLoading, (state, action) => {

        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(getUser.rejected, (state, action) => {

        });
    }
});

export default authExtraReducer.reducer;