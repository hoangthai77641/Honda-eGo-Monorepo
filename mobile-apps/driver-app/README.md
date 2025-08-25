# Honda eGo Driver App

React Native mobile application for Honda eGo delivery drivers.

## 🚀 Features

- **Driver Dashboard**: Real-time order management
- **GPS Tracking**: Live location tracking and navigation
- **Earnings**: Income tracking and analytics
- **Order Management**: Accept, pickup, and deliver orders
- **Real-time Chat**: Communication with customers
- **Offline Support**: Work without internet connection
- **Push Notifications**: Instant order notifications

## 📱 Tech Stack

- **React Native 0.72+**
- **Redux Toolkit** - State management
- **React Navigation 6** - Navigation
- **React Native Maps** - GPS and mapping
- **AsyncStorage** - Local storage
- **Push Notifications** - FCM integration
- **WebSocket** - Real-time communication

## 🔧 Installation

```bash
# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 📊 Features for Drivers

### 1. **Order Management**
- View available delivery orders
- Accept/decline orders
- Track order status
- Upload delivery proof photos

### 2. **Navigation & Tracking**
- GPS navigation to pickup/delivery locations
- Real-time location sharing
- Optimized route suggestions
- Traffic updates

### 3. **Earnings Dashboard**
- Daily/weekly/monthly earnings
- Payment history
- Performance metrics
- Bonus tracking

### 4. **Communication**
- In-app chat with customers
- Call customer directly
- Support chat with Honda eGo team

## 🛠️ Configuration

Create `.env` file:
```
API_BASE_URL=http://localhost:8080/api
WEBSOCKET_URL=ws://localhost:8080
GOOGLE_MAPS_API_KEY=your_api_key
FCM_SENDER_ID=your_sender_id
```

## 🚚 Driver Workflow

1. **Login** → Driver authentication
2. **Go Online** → Start accepting orders
3. **Receive Order** → Get order notification
4. **Navigate to Pickup** → GPS to restaurant/store
5. **Confirm Pickup** → Scan QR or photo confirmation
6. **Navigate to Customer** → GPS to delivery address
7. **Complete Delivery** → Photo proof + customer signature
8. **Earnings Updated** → Automatic payment calculation

## 📞 Support

- **Driver Support**: 1900-DRIVER (1900-374837)
- **Emergency**: 1900-HELP (1900-4357)
- **Email**: driver-support@honda-ego.com

## 📄 License

Proprietary - Honda eGo Platform
