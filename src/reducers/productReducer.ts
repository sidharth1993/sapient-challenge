import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Products } from '../interface';

export const initialState: Products = {
       products: []
} 


export const getProducts =  createAsyncThunk(
    'products/get', 
     () => {
       return axios.get<any>('https://dnc0cmt2n557n.cloudfront.net/products.json')
    },{
        
    });

export const ProductsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getProducts.fulfilled, (state, action) => action.payload.data)
    }

});


export default ProductsSlice.reducer;