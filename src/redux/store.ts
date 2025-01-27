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
import orderReducer from './feathers/order/orderSlice';
const persistConfig = {
    key: 'auth',
    storage
}
const cartPersistConfig = {
    key: 'cart',
    storage,
};
const orderPersistConfig = {
    key: 'order',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer)
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer);

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
        cart: persistedCartReducer,
        order: persistedOrderReducer,
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