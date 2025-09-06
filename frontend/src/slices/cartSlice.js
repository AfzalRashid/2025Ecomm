import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem('cart')) : {cartItems: [], shippingAddress : {}, paymentMethod : 'PayPal'}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers: {
        addToCart : (state, action)=>{
            const item = action.payload
            const existingItem = state.cartItems.find((x)=>x._id === item._id) 
            if (existingItem) {
                state.cartItems = state.cartItems.map((x)=>{
                   return x._id === existingItem._id ? item : x
                })
            } else {
                state.cartItems.push(item)
            }

            updateCart(state)
        },
        removeItem : (state, action)=>{
            const id = action.payload
            state.cartItems = state.cartItems.filter((item)=> item._id != id)
            updateCart(state)
        },
        addShippingAddress : (state, action)=>{
            state.shippingAddress = action.payload
        },
        savePaymentMethod : (state, action)=>{
            state.paymentMethod = action.payload
        }

    }
})


export const {addToCart, removeItem, addShippingAddress, savePaymentMethod} = cartSlice.actions
export default cartSlice.reducer