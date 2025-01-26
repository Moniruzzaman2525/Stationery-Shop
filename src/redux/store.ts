import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feathers/auth/authSlice'
import {
    persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { baseApi } from "./api/baseApi";
import storage from 'redux-persist/lib/storage'
import cartReducer from './feathers/cart/cartSlice'
const persistConfig = {
    key: 'auth',
    storage
}


const persistedAuthReducer = persistReducer(persistConfig, authReducer)
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,]
        }
    }).concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)