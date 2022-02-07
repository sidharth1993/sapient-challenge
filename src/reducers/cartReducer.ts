import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CartItems, Product } from '../interface';
import { Persistance } from '../utils/persistance';

const returnPayload = (state: any, action: any) => ({
    cartItems: {
        products: action.payload
    }
})

export const initialState: CartItems = {
   cartItems: {
       products: []
   }
} 

export const postCartItem =  createAsyncThunk(
    'cart/post', 
     (item: Product) => {
       return Persistance.postItemToCart(item)
    },{
        
});

export const getCartItems =  createAsyncThunk(
    'cart/get', 
     () => {
       return Persistance.getItemsFromCart()
    },{
        
});

export const removeProductFromCart =  createAsyncThunk(
    'cart/deleteProduct', 
     (id: string) => {
       return Persistance.deleteProductFromCart(id)
    },{
        
});

export const removeIdFromCart =  createAsyncThunk(
    'cart/deleteId', 
     (id: string) => {
       return Persistance.deleteIdFromCart(id)
    },{
        
});

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getCartItems.fulfilled, (state, action) => ({
            cartItems: action.payload
        }))
        .addCase(postCartItem.fulfilled, returnPayload)
        .addCase(removeIdFromCart.fulfilled, returnPayload)
        .addCase(removeProductFromCart.fulfilled, returnPayload)
    }

});

export default CartSlice.reducer;