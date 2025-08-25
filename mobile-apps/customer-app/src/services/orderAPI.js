import apiClient from './apiClient';

const orderAPI = {
  // Create new order
  createOrder: (orderData) => {
    return apiClient.post('/api/orders', orderData);
  },

  // Get order history
  getOrderHistory: (page = 1, limit = 20) => {
    return apiClient.get(`/api/orders/history?page=${page}&limit=${limit}`);
  },

  // Get order details
  getOrderDetails: (orderId) => {
    return apiClient.get(`/api/orders/${orderId}`);
  },

  // Track order
  trackOrder: (orderId) => {
    return apiClient.get(`/api/orders/${orderId}/track`);
  },

  // Cancel order
  cancelOrder: (orderId, reason) => {
    return apiClient.put(`/api/orders/${orderId}/cancel`, {reason});
  },

  // Rate order
  rateOrder: (orderId, rating, comment) => {
    return apiClient.post(`/api/orders/${orderId}/rate`, {rating, comment});
  },

  // Get order status updates
  getOrderStatusUpdates: (orderId) => {
    return apiClient.get(`/api/orders/${orderId}/status-updates`);
  },

  // Estimate order cost
  estimateCost: (orderData) => {
    return apiClient.post('/api/orders/estimate', orderData);
  },

  // Get available delivery slots
  getDeliverySlots: (date) => {
    return apiClient.get(`/api/orders/delivery-slots?date=${date}`);
  },

  // Food delivery specific
  getNearbyRestaurants: (location) => {
    return apiClient.get(`/api/orders/food/restaurants?lat=${location.latitude}&lng=${location.longitude}`);
  },

  getRestaurantMenu: (restaurantId) => {
    return apiClient.get(`/api/orders/food/restaurants/${restaurantId}/menu`);
  },

  // Ride sharing specific
  getAvailableVehicles: (location) => {
    return apiClient.get(`/api/orders/ride/vehicles?lat=${location.latitude}&lng=${location.longitude}`);
  },

  // Get current active order
  getCurrentOrder: () => {
    return apiClient.get('/api/orders/current');
  },

  // Update order location (for live tracking)
  updateOrderLocation: (orderId, location) => {
    return apiClient.put(`/api/orders/${orderId}/location`, location);
  },
};

export default orderAPI;
