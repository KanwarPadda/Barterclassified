import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {projectAuth} from "../../firestore/config";
import {getDoc} from "../../firestore/firestoreService/fireStoreService";

export const loginUserAsync = createAsyncThunk(
    'Auth/login',
    async ({email, password}, thunkApi) => {
        try {
            const snapshot = await projectAuth.signInWithEmailAndPassword(email, password);
            return await getDoc(snapshot.user.uid);

        } catch (e) {
            return thunkApi.rejectWithValue('you entered wrong credentials');

        }

    }
)


export const authSlice = createSlice({
    name: 'Auth',
    initialState: {authenticated: true, currentUser: null, adminPrivilege: false, loading: false, error: null},
    reducers: {
        verifyAuth: (state, {payload}) => {
            return projectAuth.onAuthStateChanged(user=>{
                if(user.isAdmin){
                    state.user = payload;
                    state.adminPrivilege = true
                    state.authenticated = true;
                }else if(!user.isAdmin){
                    state.user = payload;
                    state.authenticated = true;
                }else {
                    state.user = null;
                    state.adminPrivilege = false;
                    state.authenticated = false;
                }
            })


        }

    },
    extraReducers: {
        [loginUserAsync.pending]: (state) => {
            state.loading = true;

        },
        [loginUserAsync.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.currentUser = payload;


        },
        [loginUserAsync.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;

        }
    }
})


export const {verifyAuth} = authSlice.actions;
export default authSlice.reducer;