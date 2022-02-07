import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "../reducers/cartReducer";
import productReducer from '../reducers/productReducer';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.config', 'payload.request', 'meta.arg']
        }
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = ()=>useDispatch<AppDispatch>();

export default store;