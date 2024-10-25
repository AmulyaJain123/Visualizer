import { createSlice, configureStore } from '@reduxjs/toolkit';
import bstSlice from './bstSlice';
import stacksNQueueSlice from './stacksNQueue';
import graphsSlice from './graphs';

const store = configureStore({
    reducer: {
        bst: bstSlice.reducer,
        stacksNQueue: stacksNQueueSlice.reducer,
        graphs: graphsSlice.reducer
    },
});

export const bstActions = bstSlice.actions;
export const stacksNQueueActions = stacksNQueueSlice.actions;
export const graphsActions = graphsSlice.actions;


export default store;