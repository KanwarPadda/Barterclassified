import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {projectAuth, projectFireStore, projectStorage, timeStamp} from "../../firestore/config";
import {dataFromSnapshot, getDoc} from "../../firestore/firestoreService/fireStoreService";

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

export const getPostOwnerInfo = createAsyncThunk(
    'Auth/getPostOwnerInfo',
    async ({userId}, thunkApi) => {
        try {
            const snapshot = await projectFireStore.collection('Users').doc(userId).get();
            return dataFromSnapshot(snapshot);

        } catch (e) {

        }
    }
)


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
    async ({res, email, firstname, lastname, location, image, birthday}, thunkApi) => {
        try {

            const uploadPath = `Users/${res.user.uid}/${image.name}`
            const img = await projectStorage.ref(uploadPath).put(image);
            const imgUrl = await img.ref.getDownloadURL();

            await projectFireStore.collection('Users').doc(res.user.uid).set({
                firstname,
                lastname,
                location,
                profilePic: imgUrl,
                birthday,
                email,
                accountCreated: timeStamp.now()
            })


        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }

    }
);

export const authSlice = createSlice({
    name: 'Auth',
    initialState: {authenticated: true, currentUser: null, loading: false, error: null, admin: null, postOwner: null},
    reducers: {},
    extraReducers: {
        //region ***logging in User ***
        [loginUserAsync.pending]: (state) => {
            state.loading = true;

        },
        [loginUserAsync.fulfilled]: (state, {payload}) => {
            state.loading = false;
            for (const property in payload) {
                if (payload.hasOwnProperty(property)) {
                    if (payload[property] instanceof timeStamp) {
                        payload[property] = payload[property].toDate();
                    }
                }
            }


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
        },
        //endregion

        [getPostOwnerInfo.pending]: (state) => {
            state.loading = true

        },
        [getPostOwnerInfo.fulfilled]: (state, {payload}) => {
            state.loading = false
            console.log({payload});
            state.postOwner = payload
        },
        [getPostOwnerInfo.rejected]:(state, {payload}) => {
            state.loading = false
            state.postOwner = payload;
        }
    }
})


export default authSlice.reducer;