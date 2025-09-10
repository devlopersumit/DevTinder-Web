import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequests: (state, actions) => {
            return actions.payload;
        },
    },
})

export const {addRequests} = requestSlice.actions;
export default requestSlice.reducer;