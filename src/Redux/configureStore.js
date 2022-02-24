import {combineReducers, configureStore} from '@reduxjs/toolkit'
import categoryReducer from './reducers/categorySlice'
import modalSliceReducer from "./reducers/modalSlice";
import {logger} from "redux-logger/src";
import authSliceReducer from "./reducers/authSlice";
import asyncSliceReducer from "./reducers/asyncSlice"
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {productReducer} from "./reducers/productSlice";


const reducers = combineReducers({
    category: categoryReducer,
    modals: modalSliceReducer,
    auth: authSliceReducer,
    async: asyncSliceReducer,
    product: productReducer
});
const persistConfig = {
    key: 'root',
    storage: storage,
};

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)


    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

