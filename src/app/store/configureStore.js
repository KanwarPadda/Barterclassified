import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import modalSliceReducer from "./modalSlice";
import {logger} from "redux-logger/src";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        modals: modalSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})