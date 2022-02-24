import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addingDataToCollection} from "../../firestore/firestoreService/fireStoreService";
import {projectFireStore, projectStorage, timeStamp} from "../../firestore/config";

const initialState = {
    products: [],
    error: null,
    loading: null,

}
export const addProduct = createAsyncThunk(
    'Product/addProduct',
    async ({values}, thunkApi) => {
        const {currentUser} = thunkApi.getState().auth; // getting the users ID for database.

        const {barterImage, images, checkBoxChoice, barterPrice, barterProduct, ...rest} = values;
        const itemDelivery = checkBoxChoice.reduce((acc, curr) => (acc[curr] = true, acc), {}); // this reduces the item values.


        try {
            const docRef = await addingDataToCollection('Products', {
                ...rest,
                deliveryOptions: itemDelivery,
                createdAt: timeStamp.now(),
                user_id: currentUser.id,
            });
            const posts = []
            posts.push(docRef.id)

            await projectFireStore.collection('Users').doc(currentUser.id).update({posts})

            if (barterImage) {
                const uploadPath = `Products/${docRef.id}/${barterImage.name}`
                const img = await projectStorage.ref(uploadPath).put(barterImage);
                const imgUrl = await img.ref.getDownloadURL();
                await docRef.update({barter_photo: imgUrl, barterPrice, barterProduct})

                const uploadPathForPost = `Products/${docRef.id}/${images.name}`;
                const imgs = await projectStorage.ref(uploadPathForPost).put(images);
                const imgUrls = await imgs.ref.getDownloadURL();
                await docRef.update({post_photo: imgUrls});

            } else {
                const uploadPathForPost = `Products/${docRef.id}/${images.name}`;
                const imgs = await projectStorage.ref(uploadPathForPost).put(images);
                const imgUrls = await imgs.ref.getDownloadURL();
                await docRef.update({post_photo: imgUrls});
            }


        } catch (e) {
            return thunkApi.rejectWithValue(e.message);
        }

    }
);

export const getProducts = createAsyncThunk(
    'Product/getProduct',
    async ({args}, thunkApi) => {


      // const test=  await projectFireStore.collection('Products').where('categories','==',args.id).get().then((snapshot)=>snapshot.da)
      //   console.log({test});

    }
)




export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: {
        [addProduct.pending](state) {
            state.loading = true;
        },
        [addProduct.fulfilled](state) {
            state.loading = false;

        },
        [addProduct.rejected](state, {payload}) {
            state.loading = false
            state.error = payload;
        },
        [getProducts.pending](state){
            state.loading = true;
        },
        [getProducts.fulfilled](state){
            state.loading = false;
        },
        [getProducts.rejected](state){
            state.loading = false;
        }


    }


})

export const productReducer = ProductSlice.reducer