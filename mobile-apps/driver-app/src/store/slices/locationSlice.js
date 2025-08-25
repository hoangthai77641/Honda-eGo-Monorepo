import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentLocation: null,
  pickupLocation: null,
  deliveryLocation: null,
  locationPermission: null,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setPickupLocation: (state, action) => {
      state.pickupLocation = action.payload;
    },
    setDeliveryLocation: (state, action) => {
      state.deliveryLocation = action.payload;
    },
    setLocationPermission: (state, action) => {
      state.locationPermission = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearLocations: (state) => {
      state.pickupLocation = null;
      state.deliveryLocation = null;
    },
  },
});

export const {
  setCurrentLocation,
  setPickupLocation,
  setDeliveryLocation,
  setLocationPermission,
  setLoading,
  setError,
  clearError,
  clearLocations,
} = locationSlice.actions;

export default locationSlice.reducer;
