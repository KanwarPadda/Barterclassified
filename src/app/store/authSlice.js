import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'Auth',
    initialState: {authenticated: false, currentUser: null},
    reducers: {
        signInUser: (state, {payload}) => {
            state.currentUser = {
                email: payload.email,
            }
            state.authenticated = true
        },
        signOutUser: (state) => {
            state.authenticated = false;
            state.currentUser = null
        }
    }
})

export const {signInUser, signOutUser} = authSlice.actions;
export default authSlice.reducer;