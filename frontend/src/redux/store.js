import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import loadingSlice from './slices/loadingSlice';
import postSlice from './slices/postSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        posts:postSlice ,
        loading: loadingSlice
    }
})