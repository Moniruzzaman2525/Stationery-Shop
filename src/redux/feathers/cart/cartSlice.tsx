import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '../../../types';
import { RootState } from '../../store';

interface CartItem extends TProduct {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{ product: TProduct; quantity: number }>
        ) => {
            const { product, quantity } = action.payload;
            const existingItem = state.items.find((item) => item._id === product._id);
            if (existingItem) {
                existingItem.quantity += quantity; // Add the specified quantity
            } else {
                state.items.push({ ...product, quantity });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ _id: string; quantity: number }>
        ) => {
            const item = state.items.find((item) => item._id === action.payload._id);
            if (item) {
                item.quantity = action.payload.quantity; // Update the quantity
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const useCurrentCartProduct = (state: RootState) => state.cart.items;
