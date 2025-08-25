import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import {enableScreens} from 'react-native-screens';

// Enable screens for better performance
enableScreens();

/**
 * Honda eGo Customer App
 * 
 * Features:
 * - Multi-service ordering (Delivery, Food, Ride)
 * - Real-time tracking
 * - AI-powered chatbot
 * - In-app payments
 * - User profile management
 * - Order history
 * - Push notifications
 * - Maps integration
 * - Rating and reviews
 */
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
          translucent={false}
        />
        <AppNavigator />
        <Toast />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
