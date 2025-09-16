import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchServices = createAsyncThunk('service/fetchServices', async () => {
    const res = await axios.get(`${API_URL}/services`);
    return res.data;
});


const serviceSlice = createSlice({
    name: 'service',
    initialState: { services: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default serviceSlice.reducer;
