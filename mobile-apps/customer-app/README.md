# Honda eGo Customer App

React Native mobile application for Honda eGo customers to book delivery services.

## 🚀 Features

- **Easy Ordering**: Quick order placement with intuitive UI
- **Real-time Tracking**: Live tracking of delivery orders
- **Multiple Payment**: Credit card, wallet, COD options
- **AI Chatbot**: Smart customer support assistant
- **Order History**: Complete order management
- **Promotions**: Promo codes and discounts
- **Reviews & Ratings**: Rate drivers and service

## 📱 Tech Stack

- **React Native 0.72+**
- **Redux Toolkit** - State management
- **React Navigation 6** - Navigation
- **React Native Maps** - Location services
- **AsyncStorage** - Local storage
- **Push Notifications** - Order updates
- **WebSocket** - Real-time tracking

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

## 📊 Customer Features

### 1. **Order Placement**
- Select pickup and delivery locations
- Choose delivery time
- Add special instructions
- Apply promo codes

### 2. **Real-time Tracking**
- Live driver location on map
- ETA updates
- Order status notifications
- Driver contact information

### 3. **Payment & Billing**
- Multiple payment methods
- Automatic fare calculation
- Digital receipts
- Payment history

### 4. **Support & Help**
- 24/7 AI chatbot assistance
- Direct support chat
- FAQ and help articles
- Emergency contact

## 🛠️ Configuration

Create `.env` file:
```
API_BASE_URL=http://localhost:8080/api
WEBSOCKET_URL=ws://localhost:8080
GOOGLE_MAPS_API_KEY=your_api_key
PAYMENT_GATEWAY_KEY=your_payment_key
```

## 📦 Customer Journey

1. **Registration** → Sign up with phone/email
2. **Address Setup** → Add pickup/delivery locations
3. **Place Order** → Select service and confirm
4. **Payment** → Choose payment method
5. **Track Order** → Real-time delivery tracking
6. **Receive Delivery** → Confirm receipt and rate
7. **Review & Rate** → Provide feedback

## 🎨 UI/UX Features

- **Material Design** principles
- **Dark/Light mode** support
- **Accessibility** compliant
- **Smooth animations** with gesture support
- **Offline mode** for order history
- **Multi-language** support (Vietnamese/English)

## 📞 Support

- **Customer Care**: 1900-HONDA (1900-46632)
- **Emergency**: 1900-HELP (1900-4357)
- **Email**: support@honda-ego.com

## 📄 License

Proprietary - Honda eGo Platform
