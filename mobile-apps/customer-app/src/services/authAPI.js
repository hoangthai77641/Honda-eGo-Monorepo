import apiClient from './apiClient';

const authAPI = {
  // Register new user
  register: (userData) => {
    return apiClient.post('/api/auth/register', userData);
  },

  // User login
  login: (credentials) => {
    return apiClient.post('/api/auth/login', credentials);
  },

  // Logout user
  logout: () => {
    return apiClient.post('/api/auth/logout');
  },

  // Refresh access token
  refreshToken: (refreshToken) => {
    return apiClient.post('/api/auth/refresh', {refreshToken});
  },

  // Get user profile
  getProfile: () => {
    return apiClient.get('/api/auth/profile');
  },

  // Update user profile
  updateProfile: (profileData) => {
    return apiClient.put('/api/auth/profile', profileData);
  },

  // Change password
  changePassword: (passwordData) => {
    return apiClient.post('/api/auth/change-password', passwordData);
  },

  // Forgot password
  forgotPassword: (email) => {
    return apiClient.post('/api/auth/forgot-password', {email});
  },

  // Reset password
  resetPassword: (token, newPassword) => {
    return apiClient.post('/api/auth/reset-password', {token, newPassword});
  },

  // Verify email
  verifyEmail: (token) => {
    return apiClient.get(`/api/auth/verify-email?token=${token}`);
  },

  // Send OTP for phone verification
  sendPhoneOTP: (phoneNumber) => {
    return apiClient.post('/api/auth/send-phone-otp', {phoneNumber});
  },

  // Verify phone OTP
  verifyPhoneOTP: (phoneNumber, otp) => {
    return apiClient.post('/api/auth/verify-phone-otp', {phoneNumber, otp});
  },

  // Update FCM token
  updateFCMToken: (fcmToken) => {
    return apiClient.post('/api/auth/update-fcm-token', {fcmToken});
  },
};

export default authAPI;
