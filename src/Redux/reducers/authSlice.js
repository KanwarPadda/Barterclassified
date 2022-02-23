import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {projectAuth, projectStorage, timeStamp} from "../../firestore/config";
import {addingDataToCollection, getDoc} from "../../firestore/firestoreService/fireStoreService";

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

export const logOutUserAsync = createAsyncThunk(
    'Auth/Logout',
    async (_, thunkApi) => {
        try {
            await projectAuth.signOut();
        } catch (e) {
            return thunkApi.rejectWithValue('something went wrong');
        }
    }
);
export const registerUserAsync = createAsyncThunk(
    'Auth/Register',
    async ({email, firstname, lastname, location, image, password, birthday}, thunkApi) => {
        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            if (!res) {
                return thunkApi.rejectWithValue('email already exists')
            }
            const uploadPath = `Users/${res.user.uid}/${image.name}`
            const img = await projectStorage.ref(uploadPath).put(image);
            const imgUrl = await img.ref.getDownloadURL();

            await addingDataToCollection('Users', {
                id: res.user.uid,
                firstname,
                lastname,
                location,
                profilePic: imgUrl,
                birthday,
                email,
                accountCreated: timeStamp.now()
            });
        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }

    }
);

export const authSlice = createSlice({
    name: 'Auth',
    initialState: {authenticated: true, currentUser: null, loading: false, error: null, admin: null},
    reducers: {},
    extraReducers: {
        //region ***logging in User ***
        [loginUserAsync.pending]: (state) => {
            state.loading = true;

        },
        [loginUserAsync.fulfilled]: (state, {payload}) => {
            state.loading = false;
            if (payload.isAdmin) {
                state.admin = payload;
            } else {

                state.currentUser = payload;
            }
        },
        [loginUserAsync.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        },
        //endregion
        [registerUserAsync.pending]: (state) => {
            state.loading = true
        },
        [registerUserAsync.fulfilled]: (state) => {
            state.loading = false
        },
        [registerUserAsync.rejected]: (state, {payload}) => {
            state.error = payload;
        },

        //region LogOut
        [logOutUserAsync.pending]: (state) => {
            state.loading = true;
        },
        [logOutUserAsync.fulfilled]: (state) => {
            state.loading = false;
            if (state.admin) {
                state.admin = null
            } else {
                state.currentUser = null;
            }

        },
        [logOutUserAsync.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        }
        //endregion
    }
})


export const {} = authSlice.actions;
export default authSlice.reducer;