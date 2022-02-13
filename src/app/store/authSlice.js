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
        },
        registerUser: (state, { payload }) => {
            state.currentUser = {
                email: payload.email,
                firstname: payload.firstname,
                lastname: payload.lastname,
            }
            state.authenticated = true
        }
    }
})

export const {signInUser, signOutUser, registerUser} = authSlice.actions;
export default authSlice.reducer;