import { createSlice, configureStore } from '@reduxjs/toolkit';
import bstSlice from './bstSlice';

const store = configureStore({
    reducer: {
        bst: bstSlice.reducer,
    },
});

export const bstActions = bstSlice.actions;

export default store;