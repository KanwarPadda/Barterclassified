import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import modalSliceReducer from "./modalSlice";
import {logger} from "redux-logger/src";
import authSliceReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        modals: modalSliceReducer,
        auth: authSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

