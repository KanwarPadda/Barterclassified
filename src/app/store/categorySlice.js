import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    category: [],
    status: 'idle',
}



export const categorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            console.log(action);
            state.category = action.payload;
        },
        addCategory: (state, {payload,dispatch}) => {
            console.log(dispatch)

            state.category.push(payload);
        }
    }
})

export const {setCategory, addCategory} = categorySlice.actions
export default categorySlice.reducer
