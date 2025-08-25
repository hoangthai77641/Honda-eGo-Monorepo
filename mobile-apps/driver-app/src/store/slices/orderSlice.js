import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import orderAPI from '../../services/orderAPI';

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, {rejectWithValue}) => {
    try {
      const response = await orderAPI.createOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create order');
    }
  }
);

export const getOrderHistory = createAsyncThunk(
  'orders/getHistory',
  async (_, {rejectWithValue}) => {
    try {
      const response = await orderAPI.getOrderHistory();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to get order history');
    }
  }
);

export const trackOrder = createAsyncThunk(
  'orders/track',
  async (orderId, {rejectWithValue}) => {
    try {
      const response = await orderAPI.trackOrder(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to track order');
    }
  }
);

const initialState = {
  currentOrder: null,
  orderHistory: [],
  trackingData: null,
  loading: false,
  error: null,
  createLoading: false,
  trackingLoading: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    updateOrderStatus: (state, action) => {
      if (state.currentOrder && state.currentOrder.id === action.payload.orderId) {
        state.currentOrder.status = action.payload.status;
      }
      
      const orderIndex = state.orderHistory.findIndex(order => order.id === action.payload.orderId);
      if (orderIndex !== -1) {
        state.orderHistory[orderIndex].status = action.payload.status;
      }
    },
    addTrackingUpdate: (state, action) => {
      state.trackingData = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createLoading = false;
        state.currentOrder = action.payload;
        state.orderHistory.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      
      // Get Order History
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orderHistory = action.payload;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Track Order
      .addCase(trackOrder.pending, (state) => {
        state.trackingLoading = true;
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.trackingLoading = false;
        state.trackingData = action.payload;
      })
      .addCase(trackOrder.rejected, (state, action) => {
        state.trackingLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearCurrentOrder,
  updateOrderStatus,
  addTrackingUpdate,
  clearError,
} = orderSlice.actions;

export default orderSlice.reducer;
