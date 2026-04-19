import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all products
export const getProduct = createAsyncThunk("product/getProduct", async ({ keyword, page = 1 }, { rejectWithValue }) => {
    try {
        const link = keyword ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}` : `/api/v1/products?page=${page}`;
        const { data } = await axios.get(link);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong..!");
    }
});

// Fetch a single product by ID
export const getProductDetails = createAsyncThunk("product/getProductDetails", async (id, { rejectWithValue }) => {
    try {
        const link = `/api/v1/product/${id}`;
        const { data } = await axios.get(link);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong..!");
    }
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        productCount: 0,
        loading: false,
        error: null,
        product: null, 
        resultsPerPage: 4, 
        totalPages: 0,
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle getProduct (All Products)
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.error = action.payload || "Something went wrong";
            })

            // Handle getProductDetails (Single Product)
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null; // Clear old product data while loading new one
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const { removeErrors } = productSlice.actions;
export default productSlice.reducer;