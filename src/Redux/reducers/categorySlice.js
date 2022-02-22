import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {category} from "../constant/constant";
import {projectFireStore, projectStorage, timeStamp} from "../../firestore/config";
import {addingDataToCollection, dataFromSnapshot} from "../../firestore/firestoreService/fireStoreService";


export const fetchCategoriesAsync = createAsyncThunk(
    `${category}/loadCategories`,
    async (_, thunkApi) => {

        try {

            const querySnapShot = await projectFireStore.collection('Categories').get();

            return (querySnapShot.docs.map(d => (dataFromSnapshot(d))));

        } catch (error) {
            return thunkApi.rejectWithValue({error: error.data});

        }


    }
)

export const fetchSingleCategory = createAsyncThunk(
    `${category}/fetchSingleCategory`,
    async ({id}, thunkApi) => {


    }
)

export const addCategoryAsync = createAsyncThunk(
    `${category}/addingCategory`,
    async ({title, description, image}, thunkApi) => {
        try {
            const docRef = await addingDataToCollection('Categories', {title, description})

            const uploadPath = `Categories/${docRef.id}/${image.name}`;
            const img = await projectStorage.ref(uploadPath).put(image);
            const imurl = await img.ref.getDownloadURL();
            await docRef.update({dateAdded: timeStamp.now(), photo: imurl});


        } catch (e) {
            thunkApi.rejectWithValue(e);
        }
    }
)


export const categorySlice = createSlice({
    name: category,
    initialState: {
        loading: false,
        error: null,
        categories: []
    },
    reducers: {},
    extraReducers: {
        [fetchCategoriesAsync.pending](state) {
            state.loading = true;
        },

        [fetchCategoriesAsync.fulfilled](state, {payload}) {

            state.categories = [...payload];
            state.loading = false

        }
        ,
        [fetchCategoriesAsync.rejected](state) {

            state.loading = false;
            state.error = true;

        },
        [fetchSingleCategory.pending](state) {
            state.loading = true;
        },
        [fetchSingleCategory.fulfilled](state, {payload}) {
            state.loading = false;
        },
        [fetchSingleCategory.rejected](state) {
            state.loading = false;
            state.error = true;
        },
        [addCategoryAsync.pending](state) {
            state.loading = true;
        },
        [addCategoryAsync.fulfilled](state) {
            state.loading = false;
        },
        [addCategoryAsync.rejected](state, {payload}) {
            state.loading = false;
            state.error = payload;
        }

    }


})


export const {setCategory, addCategory} = categorySlice.actions
export default categorySlice.reducer
