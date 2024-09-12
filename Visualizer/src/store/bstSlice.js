import { createSlice, current } from "@reduxjs/toolkit";

const initialSlice = {
    treeObject: null,
    treeArr: null,
    currentOp: [null, null],

}

const bstSlice = createSlice({
    name: 'bst',
    initialState: initialSlice,
    reducers: {
        setTreeObject(state, action) {
            state.treeObject = JSON.parse(JSON.stringify(action.payload));
        },
        setCurrentOp(state, action) {
            state.currentOp = JSON.parse(JSON.stringify(action.payload));
        },
        setTreeArr(state, action) {
            state.treeArr = JSON.parse(JSON.stringify(action.payload));
        }

    }
})

export default bstSlice;