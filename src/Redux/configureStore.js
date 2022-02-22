import {combineReducers, configureStore} from '@reduxjs/toolkit'
import categoryReducer from './reducers/categorySlice'
import modalSliceReducer from "./reducers/modalSlice";
import {logger} from "redux-logger/src";
import authSliceReducer from "./reducers/authSlice";
import asyncSliceReducer from "./reducers/asyncSlice"
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'



const reducers = combineReducers({
    category: categoryReducer,
    modals: modalSliceReducer,
    auth: authSliceReducer,
    async: asyncSliceReducer
});
const persistConfig = {
    key: 'root',
    storage: storage,
};

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}).concat(logger)


    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

