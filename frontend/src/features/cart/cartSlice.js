import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCartItem = createAsyncThunk("cart/addToCart", async ({ id, quantity }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/product/${id}`);
        return {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image[0].url,
            stock: data.product.stock,
            quantity
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || "An Error Occurred while add to cart");
    }
});

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
    loading: false,
    error: null,
    success: false,
    message: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeMessage: (state) => {
            state.message = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems");
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        saveShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = null;
            })
            .addCase(addToCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                
                const item = action.payload;
                const existingItem = state.cartItems.find((i) => i.product === item.product);

                if (existingItem) {
                    existingItem.quantity = item.quantity;
                    state.message = `Updated ${item.name} quantity in the cart`;
                } else {
                    state.cartItems.push(item);
                    state.message = `${action.payload.name} added to cart`;
                }

                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            })
            .addCase(addToCartItem.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || "Something went wrong";
            });
    }
});

export const { removeErrors, removeMessage, removeSuccess, clearCart, removeItemFromCart, saveShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;