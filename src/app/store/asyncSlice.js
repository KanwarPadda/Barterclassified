import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    error: null
}

export const asyncSlice = createSlice({
    name:'Async',
    initialState,
    reducers: {
        asyncActionStart: (state) => {
            state.loading = true;
            state.error = null;

        },
        asyncActionFinish: (state) => {
            state.loading = false;
            return state;
        },
        asyncActionError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            return state;
        }

    }


})
export const {asyncActionStart, asyncActionFinish, asyncActionError} = asyncSlice.actions;
export default asyncSlice.reducer;