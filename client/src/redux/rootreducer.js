import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getErrors } from './errorReducer';
import { tokenConfig } from '../redux/extraReducer/authExtraReducer';

export const fetchdata = createAsyncThunk('rootreducer/fetchdata', async () => {
  try {
    const res = await axios.get('/api/items');
    const data = res.data;
    return data;
  } catch (error) {
    throw Error(error);
  }
});

export const deleteItem = createAsyncThunk(
  'rootreducer/deleteItem',
  async (id, { dispatch, getState, rejectWithValue }) => {
    return axios.delete(`/api/items/${id}`, tokenConfig(getState))
    .then(() => {
      return id;
    })
    .catch(err => {
      const errData= {
        msg: err.response.data.msg,
        status: err.response.status
      }
      dispatch(getErrors(errData));
      return rejectWithValue(err.response.data.msg);
    })
  }
);

// Add Item
export const addItem = createAsyncThunk('rootreducer/addItem', async (newItem, {dispatch, getState, rejectWithValue}) => {

    return axios.post('/api/items', newItem, tokenConfig(getState))
    .then(res => {
      return res.data;
    }).catch(err => {
      const errData = {
        msg: err.response.data.msg,
        status: err.response.status,
      }
      dispatch(getErrors(errData));
      return rejectWithValue(err.response.data.msg);
    })
});

export const reducerSlice = createSlice({
  name: 'rootreducer',
  initialState: {
    items: [],
    loading: false,
    error: null,
    isLoggedin: true,
  },
  reducers: {
    getItems: state => {
      return {
        ...state,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchdata.pending, (state, action) => {
      return{
        ...state,
        loading: true,
        error: null
      }
    });
    builder.addCase(fetchdata.fulfilled, (state, action) => {
      return{
        ...state,
        items: action.payload,
        loading: false
      }
    });
    builder.addCase(fetchdata.rejected, (state, action)=> {
      return{
        ...state,
        error: action.error.message,
        loading: false
      }
    });
    // Delete Item
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      return{
        ...state,
        items: state.items.filter(item => item._id !== action.payload )
      }
    });
    builder.addCase(deleteItem.rejected, (state, action) => {
      return{
        ...state,
        error: action.payload
      }
    });
    //AddItem
    builder.addCase(addItem.fulfilled, (state, action) => {
      return{
        ...state,
        items: [action.payload, ...state.items],
        error: null
      }
    });
    builder.addCase(addItem.rejected, (state, action) => {
      return{
        ...state,
        error: action.payload
      }
    })
  }
});

export const { getItems, loading } = reducerSlice.actions;
export default reducerSlice.reducer;
