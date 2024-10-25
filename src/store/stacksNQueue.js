import { createSlice, current } from "@reduxjs/toolkit";

const initialSlice = {
    stackArr: null,
    currentOp: null,
    disable: false,
    stackHelp: null,
    peekElement: null
}

const stacksNQueueSlice = createSlice({
    name: 'stacksNQueue',
    initialState: initialSlice,
    reducers: {
        setStackArr(state, action) {
            state.stackArr = action.payload;
        },
        pushStackArr(state, action) {
            state.stackArr.push(action.payload);
        },
        popStackArr(state, action) {
            state.stackArr.pop();
        },
        setCurrOp(state, action) {
            state.currentOp = action.payload;
        },
        setDisable(state, action) {
            state.disable = action.payload;
        },
        setPeekElement(state, action) {
            state.peekElement = action.payload;
        },
        setStackHelp(state, action) {
            state.stackHelp = action.payload;
        },
        enqueue(state, action) {
            state.stackArr.unshift(action.payload);
        },
        deque(state, action) {
            state.stackArr.shift();
        },
        reset(state) {
            state.stackArr = null
            state.currentOp = null
            state.disable = false
            state.stackHelp = null
            state.peekElement = null

        }

    }
})

export default stacksNQueueSlice;