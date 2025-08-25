import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-hot-toast';

// Layout Components
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';

// Page Components
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Vehicles from './pages/vehicles/Vehicles';
import Orders from './pages/orders/Orders';
import Analytics from './pages/analytics/Analytics';
import Settings from './pages/settings/Settings';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

/**
 * Honda eGo Admin Dashboard Application
 * 
 * Features:
 * - Real-time dashboard with analytics
 * - User management (customers, drivers, admins)
 * - Vehicle tracking and management
 * - Order processing and monitoring
 * - Advanced analytics and reporting
 * - System settings and configuration
 * - Responsive design with Bootstrap 5
 * - Real-time updates with WebSocket
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/vehicles" element={<Vehicles />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
          
          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
