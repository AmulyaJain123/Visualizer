import { createSlice, current } from "@reduxjs/toolkit";
import { arrToAdjacencyList, arrToAdjacencyMatrix, listToDisplay } from "../algorithms/graphs";
import { json } from "react-router-dom";

const initialSlice = {
    edgesArr: null,
    list: null,
    matrix: null,
    display: null
}

const graphsSlice = createSlice({
    name: 'graphs',
    initialState: initialSlice,
    reducers: {
        setEdgesArr(state, action) {
            state.edgesArr = JSON.parse(JSON.stringify(action.payload));
            const lst = arrToAdjacencyList(state.edgesArr);
            const mat = arrToAdjacencyMatrix(state.edgesArr);
            const dis = listToDisplay(lst);
            state.matrix = JSON.parse(JSON.stringify(mat));
            state.list = JSON.parse(JSON.stringify(lst));
            state.display = JSON.parse(JSON.stringify(dis));

        },
        pushEdgesArr(state, action) {
            state.edgesArr.push([...action.payload]);
            const lst = arrToAdjacencyList(state.edgesArr);
            const mat = arrToAdjacencyMatrix(state.edgesArr);
            const dis = listToDisplay(lst);
            state.matrix = JSON.parse(JSON.stringify(mat));
            state.list = JSON.parse(JSON.stringify(lst));
            state.display = JSON.parse(JSON.stringify(dis));


        },
        removeEdge(state, action) {
            state.edgesArr.splice(action.payload, 1);
            const lst = arrToAdjacencyList(state.edgesArr);
            const mat = arrToAdjacencyMatrix(state.edgesArr);
            const dis = listToDisplay(lst);
            state.matrix = JSON.parse(JSON.stringify(mat));
            state.list = JSON.parse(JSON.stringify(lst));
            state.display = JSON.parse(JSON.stringify(dis));


        }
    }
})

export default graphsSlice;