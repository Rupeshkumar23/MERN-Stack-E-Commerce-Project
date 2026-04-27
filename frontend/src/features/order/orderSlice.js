import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create Order
export const createOrder = createAsyncThunk("order/createOrder", async (orderData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("/api/v1/new/order", orderData, config);
        console.log("Created Order Details : ", data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "An Error Occurred while creating order");
    }
});

// Get All Orders for User
export const getAllOrders = createAsyncThunk("order/getAllOrders", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("/api/v1/orders/user");
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "An Error Occurred while fetching orders");
    }
});

// Get Single Order Details
export const getOrderDetails = createAsyncThunk("order/getOrderDetails", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/v1/order/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data || "An Error Occurred while fetching order details");
    }
});

const initialState = {
    success: false,
    loading: false,
    error: null,
    message: false,
    orders: [],
    order: {},
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Order Cases
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.order = action.payload.order;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Order creating failed";
            })
            
            // Get All Orders Cases
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.orders = action.payload.orders;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to fetch orders";
            })
            
            // Get Order Details Cases
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.order = action.payload.order;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to fetch order details";
            });
    }
});

export const { removeErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;