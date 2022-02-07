import axios from "axios";
import { Product } from "../interface";

export class Persistance {
    static postItemToCart = (item: Product) => {
        const existingCart = localStorage.getItem("cart.item");
        let cartItems;
        if (existingCart) {
            cartItems = JSON.parse(existingCart);
        } else {
            cartItems = {products:[]};
        }
        cartItems.products = [...cartItems.products,item];
        localStorage.setItem("cart.item",JSON.stringify(cartItems));
        return cartItems.products;
    };
    static getItemsFromCart = async () => {
        const existingCart = localStorage.getItem("cart.item");
        if (existingCart) {
            return new Promise((resolve) => {
                resolve(JSON.parse(existingCart));
            })
        } else {
            return axios.get('https://dnc0cmt2n557n.cloudfront.net/products.json').then((response) => {
                localStorage.setItem("cart.item",JSON.stringify(response.data));
                return response.data
            })
        }
    }
    static deleteProductFromCart = (id: string) => {
        const existingCart = localStorage.getItem("cart.item");
        let cartItems:any = [];
        if (existingCart) {
            cartItems = JSON.parse(existingCart).products;
            cartItems = cartItems.filter((product: Product) => product.id !== id);
        }
        localStorage.setItem("cart.item",JSON.stringify({products:[...cartItems]}));
        return cartItems;
    }
    static deleteIdFromCart = (id: string) => {
        const existingCart = localStorage.getItem("cart.item");
        let cartItems:any = [];
        if (existingCart) {
            cartItems = JSON.parse(existingCart).products;
            const prodIndex = cartItems.findIndex((product: Product) => product.id === id);
            if (cartItems.length > 1) {
                cartItems = [...cartItems.slice(0,prodIndex),...cartItems.slice(prodIndex+1)];
            } else {
                cartItems = []
            }
        }
        localStorage.setItem("cart.item",JSON.stringify({products:[...cartItems]}));
        return cartItems;
    }
}
