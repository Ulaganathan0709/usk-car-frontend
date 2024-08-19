import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
    return response.data;
});

const carSlice = createSlice({
    name: 'cars',
    initialState: {
        cars: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cars = action.payload;
            })
            .addCase(fetchCars.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default carSlice.reducer;
