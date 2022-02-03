import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {category} from "./ReducerName/constant";
import firebase from '../config/firebase';
import {dataFromSnapshot} from "../firestore/fireStoreService";
import {asyncActionError} from "./asyncSlice";

const db = firebase.firestore();

export const fetchCategories = createAsyncThunk(
    `${category}/loadCategories`,
    async (_, thunkApi) => {

        try {
            const querySnapShot = await db.collection('Categories').get();
            const categories = (querySnapShot.docs.map(d => (dataFromSnapshot(d))));
            if (categories.length > 0) {
                return categories;

            } else {
                return thunkApi.rejectWithValue({error: 'error'});

            }

        } catch (error) {
            return thunkApi.rejectWithValue({error: error.data});

        }


    }
)

export const fetchSingleCategory = createAsyncThunk(
    `${category}/fetchSingleCategory`,
    async ({id}, thunkApi) => {
        console.log({id});
        try {
            const snapshot = await db.collection('Categories').doc(id).get().then(snapshot => snapshot.data());


            if (snapshot === undefined) {
                thunkApi.dispatch(asyncActionError());
                return thunkApi.rejectWithValue({error: 'error'});

            }else {
                thunkApi.dispatch(fetchCategories())
                return snapshot.id;
            }


        } catch (error) {
            return thunkApi.rejectWithValue({error: 'error'});
        }
    }
)

const categoriesAdapter = createEntityAdapter({
    selectId: (category) => category.id,
})


export const categorySlice = createSlice({
    name: category,
    initialState: categoriesAdapter.getInitialState({loading: false, error: null}),
    reducers: {},
    extraReducers: {
        [fetchCategories.pending](state) {
            state.loading = true;
        },

        [fetchCategories.fulfilled](state, {payload}) {
            state.loading = false;
            categoriesAdapter.setAll(state, payload);

        },
        [fetchCategories.rejected](state) {
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
        }

    }


})

export const categorySelectors = categoriesAdapter.getSelectors((state) => state.category)

export const {setCategory, addCategory} = categorySlice.actions
export default categorySlice.reducer
