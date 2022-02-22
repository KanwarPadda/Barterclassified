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
);

export  const logOutUserAsync = createAsyncThunk(
    'Auth/Logout',
    async (_,thunkApi)=>{
        try {
            await projectAuth.signOut();
        }catch (e) {
            return thunkApi.rejectWithValue('something went wrong');
        }
    }
)


export const authSlice = createSlice({
    name: 'Auth',
    initialState: {authenticated: true, currentUser: null, loading: false, error: null,admin:null},
    reducers: {},
    extraReducers: {
        //region ***logging in User ***
        [loginUserAsync.pending]: (state) => {
            state.loading = true;

        },
        [loginUserAsync.fulfilled]: (state, {payload}) => {
            state.loading = false;
            if(payload.isAdmin){
                state.admin = payload;
            }else {

                state.currentUser = payload;
            }
        },
        [loginUserAsync.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        },
        //endregion

        [logOutUserAsync.pending]: (state) => {
            state.loading = true;
        },
        [logOutUserAsync.fulfilled]:(state)=>{
            state.loading = false;
            if(state.admin){
                state.admin = null
            }else {
                state.currentUser = null;
            }

        },
        [logOutUserAsync.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        }
    }
})


export const {} = authSlice.actions;
export default authSlice.reducer;