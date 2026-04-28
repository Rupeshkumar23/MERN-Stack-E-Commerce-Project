import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllOrders = createAsyncThunk("admin/fetchAllOrders", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/admin/orders');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Failed to Fetch Orders");
    }
});

export const fetchAdminProducts = createAsyncThunk("admin/fetchAdminProducts", async (page = 1, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/products?page=${page}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Error While Fetching the products");
    }
});

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/admin/users');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Failed to Fetch users");
    }
});

export const fetchAllReviews = createAsyncThunk("admin/fetchAllReviews", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/api/v1/admin/all-reviews');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Failed to Fetch All Reviews");
    }
});

const initialState = {
    totalAmount: 0,
    orders: [],
    products: [],
    productCount: 0,
    users: [],
    outOfStock: 0,
    reviews: [],
    success: false,
    loading: false,
    error: null,
    message: null,
    resultsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = false;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Order Details
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.totalAmount = action.payload.totalAmount;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to Fetch Orders";
            })

        // Fetch Admin Products
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.success = action.payload.success;
                state.productCount = action.payload.productCount;
                state.outOfStock = action.payload.outOfStock;
                state.resultsPerPage = action.payload.resultsPerPage || state.resultsPerPage;
                state.totalPages = action.payload.totalPages || state.totalPages;
                state.currentPage = action.payload.currentPage || state.currentPage;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to Fetch Products";
            })

        // Fetch all users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.success = action.payload.success;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to Fetch users";
            })

        // Fetch all Reviews
        builder
            .addCase(fetchAllReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.reviews = action.payload.reviews;
            })
            .addCase(fetchAllReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to Fetch All Reviews";
            });
    }
});

export const { removeErrors, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;