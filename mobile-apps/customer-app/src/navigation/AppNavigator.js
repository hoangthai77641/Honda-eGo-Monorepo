import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import ServicesScreen from '../screens/main/ServicesScreen';
import OrderHistoryScreen from '../screens/main/OrderHistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Order Screens
import DeliveryOrderScreen from '../screens/orders/DeliveryOrderScreen';
import FoodOrderScreen from '../screens/orders/FoodOrderScreen';
import RideOrderScreen from '../screens/orders/RideOrderScreen';
import OrderDetailsScreen from '../screens/orders/OrderDetailsScreen';
import PaymentScreen from '../screens/orders/PaymentScreen';

// Tracking Screens
import TrackingScreen from '../screens/tracking/TrackingScreen';
import LiveTrackingScreen from '../screens/tracking/LiveTrackingScreen';

// Other Screens
import NotificationsScreen from '../screens/main/NotificationsScreen';
import ChatScreen from '../screens/main/ChatScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import HelpScreen from '../screens/main/HelpScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Colors
const Colors = {
  primary: '#E60012', // Honda Red
  secondary: '#1E3A8A',
  accent: '#10B981',
  white: '#FFFFFF',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
  dark: '#111827',
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Services') {
            iconName = 'apps';
          } else if (route.name === 'Orders') {
            iconName = 'history';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.lightGray,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{title: 'Trang chủ'}}
      />
      <Tab.Screen 
        name="Services" 
        component={ServicesScreen} 
        options={{title: 'Dịch vụ'}}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrderHistoryScreen} 
        options={{title: 'Đơn hàng'}}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{title: 'Tài khoản'}}
      />
    </Tab.Navigator>
  );
};

// Auth Stack
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          title: 'Đăng nhập',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{title: 'Đăng ký'}}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{title: 'Quên mật khẩu'}}
      />
      <Stack.Screen 
        name="OTPVerification" 
        component={OTPVerificationScreen}
        options={{title: 'Xác thực OTP'}}
      />
    </Stack.Navigator>
  );
};

// Main Stack
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{headerShown: false}}
      />
      
      {/* Order Screens */}
      <Stack.Screen 
        name="DeliveryOrder" 
        component={DeliveryOrderScreen}
        options={{title: 'Giao hàng'}}
      />
      <Stack.Screen 
        name="FoodOrder" 
        component={FoodOrderScreen}
        options={{title: 'Giao đồ ăn'}}
      />
      <Stack.Screen 
        name="RideOrder" 
        component={RideOrderScreen}
        options={{title: 'Đi chung xe'}}
      />
      <Stack.Screen 
        name="OrderDetails" 
        component={OrderDetailsScreen}
        options={{title: 'Chi tiết đơn hàng'}}
      />
      <Stack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{title: 'Thanh toán'}}
      />
      
      {/* Tracking Screens */}
      <Stack.Screen 
        name="Tracking" 
        component={TrackingScreen}
        options={{title: 'Theo dõi đơn hàng'}}
      />
      <Stack.Screen 
        name="LiveTracking" 
        component={LiveTrackingScreen}
        options={{
          title: 'Theo dõi trực tiếp',
          headerShown: false,
        }}
      />
      
      {/* Other Screens */}
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{title: 'Thông báo'}}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{title: 'Hỗ trợ AI'}}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{title: 'Cài đặt'}}
      />
      <Stack.Screen 
        name="Help" 
        component={HelpScreen}
        options={{title: 'Trợ giúp'}}
      />
    </Stack.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
