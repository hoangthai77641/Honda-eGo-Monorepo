import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  preferences: {
    language: 'vi',
    notifications: true,
    theme: 'light',
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = {...state.profile, ...action.payload};
    },
    updatePreferences: (state, action) => {
      state.preferences = {...state.preferences, ...action.payload};
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
  },
});

export const {
  updateProfile,
  updatePreferences,
  setLoading,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
