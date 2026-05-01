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

// Added Create Product Thunk
export const createProduct = createAsyncThunk("admin/createProduct", async (productData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const { data } = await axios.post('/api/v1/admin/product/create', productData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Product Creation Failed");
    }
});

// Added Update Product Thunk
export const updateProduct = createAsyncThunk("admin/updateProduct", async ({ id, productData }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const { data } = await axios.put(`/api/v1/admin/product/product/${id}`, productData, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "Product Update Failed");
    }
});

// Added Delete Product Thunk
export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/product/product/${id}`);
        return { id, ...data };
    } catch (error) {
        return rejectWithValue(error.response.data || "Product Delete Failed");
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
            })
            
        // Added Create Product Builder Cases
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                // Optional: Push the newly created product to the products array instantly 
                // to avoid needing to refresh the page/re-fetch.
                if (action.payload.product) {
                    state.products.push(action.payload.product);
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Product Creation Failed";
            })

        // Added Update Product Builder Cases
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                // Update the product in the products array
                if (action.payload.product) {
                    const index = state.products.findIndex(p => p._id === action.payload.product._id);
                    if (index !== -1) {
                        state.products[index] = action.payload.product;
                    }
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Product Update Failed";
            })

        // Added Delete Product Builder Cases
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                // Remove the product from the products array
                state.products = state.products.filter(p => p._id !== action.payload.id);
                state.productCount -= 1;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Product Delete Failed";
            });
    }
});

export const { removeErrors, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;