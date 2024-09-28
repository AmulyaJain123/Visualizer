import { createSlice, configureStore } from '@reduxjs/toolkit';
import bstSlice from './bstSlice';
import stacksNQueueSlice from './stacksNQueue';

const store = configureStore({
    reducer: {
        bst: bstSlice.reducer,
        stacksNQueue: stacksNQueueSlice.reducer
    },
});

export const bstActions = bstSlice.actions;
export const stacksNQueueActions = stacksNQueueSlice.actions;


export default store;