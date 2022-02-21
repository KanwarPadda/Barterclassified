import {combineReducers, configureStore} from '@reduxjs/toolkit'
import categoryReducer from './reducers/categorySlice'
import modalSliceReducer from "./reducers/modalSlice";
import {logger} from "redux-logger/src";
import authSliceReducer from "./reducers/authSlice";
import asyncSliceReducer from "./reducers/asyncSlice"
import storage from 'reduxjs-toolkit-persist/lib/storage'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers({
    category: categoryReducer,
    modals: modalSliceReducer,
    auth: authSliceReducer,
    async: asyncSliceReducer
})


const _persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
    reducer: _persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ],
        }
    }).concat(logger)


    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

