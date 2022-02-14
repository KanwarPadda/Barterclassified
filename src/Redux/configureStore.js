import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from './reducers/categorySlice'
import modalSliceReducer from "./reducers/modalSlice";
import {logger} from "redux-logger/src";
import authSliceReducer from "./reducers/authSlice";
import asyncSliceReducer from "./reducers/asyncSlice"

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        modals: modalSliceReducer,
        auth: authSliceReducer,
        async: asyncSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

