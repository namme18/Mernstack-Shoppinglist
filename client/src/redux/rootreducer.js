import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchdata = createAsyncThunk('rootreducer/fetchdata', async () => {
  try {
    const res = await axios.get('/api/items');
    const data = res.data;
    return data;
  } catch (error) {
    throw Error(error);
  }
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
    deleteItem: (state, action) => {
      const id = action.payload;
      axios.delete(`/api/items/${id}`)
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      axios.post('/api/items', newItem);
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    },
  },
  extraReducers: {
    [fetchdata.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchdata.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    [fetchdata.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export const { getItems, deleteItem, addItem, loading } = reducerSlice.actions;
export default reducerSlice.reducer;
