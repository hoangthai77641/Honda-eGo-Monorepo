# Honda eGo - AI-Powered Electric Vehicle Service Platform

<div align="center">
  <img src="https://img.shields.io/badge/Honda-eGo-blue?style=for-the-badge" alt="Honda eGo">
  <img src="https://img.shields.io/badge/Platform-Electric%20Vehicle-green?style=for-the-badge" alt="EV Platform">
  <img src="https://img.shields.io/badge/AI-Powered-orange?style=for-the-badge" alt="AI Powered">
</div>

## 🚗⚡ Overview

Honda eGo is a comprehensive AI-powered electric vehicle service management platform, inspired by modern ride-sharing services like Uber and Grab. This monorepo contains all components of the Honda eGo ecosystem.

## 🏗️ Architecture

```
Honda-eGo-Monorepo/
├── backend/                    # Spring Boot Microservices
│   ├── auth-service/          # JWT Authentication & Authorization
│   ├── eureka-server/         # Service Discovery
│   ├── api-gateway/           # API Gateway & Routing
│   ├── user-service/          # User Management
│   ├── order-service/         # Order Processing
│   └── location-service/      # GPS Tracking & Geolocation
├── mobile-apps/               # React Native Applications
│   ├── driver-app/            # Driver Mobile Application
│   └── customer-app/          # Customer Mobile Application
├── web-apps/                  # Web Applications
│   ├── admin-dashboard/       # React Admin Dashboard
│   └── website-client/        # Next.js Marketing Website
├── shared/                    # Shared Libraries & Types
│   ├── types/                 # TypeScript Definitions
│   ├── utils/                 # Common Utilities
│   └── constants/             # Shared Constants
├── infrastructure/            # DevOps & Infrastructure
│   ├── docker/                # Docker Configurations
│   ├── k8s/                   # Kubernetes Manifests
│   └── terraform/             # Infrastructure as Code
├── docs/                      # Documentation
├── scripts/                   # Build & Deployment Scripts
└── tests/                     # Integration & E2E Tests
```

## 🛠️ Technology Stack

### Backend (Java/Spring Boot)
- **Framework**: Spring Boot 3.1.5, Spring Security 6
- **Database**: PostgreSQL 15, Redis 7
- **Authentication**: JWT (JSON Web Tokens)
- **Service Discovery**: Eureka Server
- **API Gateway**: Spring Cloud Gateway
- **Build Tool**: Maven

### Mobile (React Native)
- **Framework**: React Native 0.72+
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation 6
- **Maps**: React Native Maps (Google Maps)
- **Real-time**: WebSocket
- **Push Notifications**: Firebase Cloud Messaging

### Web (React/Next.js)
- **Admin Dashboard**: React 18, Bootstrap 5
- **Website**: Next.js 14, Tailwind CSS
- **State Management**: Redux Toolkit
- **UI Components**: React Bootstrap, Headless UI

### Infrastructure
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes
- **Cloud**: AWS/Azure/GCP
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15
- Redis 7

### Development with GitHub Codespace (Recommended)

1. **Open in Codespace**:
   ```bash
   # Click "Code" → "Codespaces" → "Create codespace on main"
   # Or use GitHub CLI:
   gh codespace create --repo hoangthai77641/Honda-eGo-Monorepo
   ```

2. **Environment Setup** (Automatic):
   - Java 17 + Maven
   - Node.js 18 + npm/yarn
   - Docker-in-Docker
   - PostgreSQL & Redis containers
   - VS Code extensions

3. **Start Development**:
   ```bash
   # Backend services will start automatically
   # Access services:
   # - API Gateway: http://localhost:8080
   # - Eureka Server: http://localhost:8761
   # - Admin Dashboard: http://localhost:3000
   ```

### Local Development Setup

1. **Clone Repository**:
   ```bash
   git clone https://github.com/hoangthai77641/Honda-eGo-Monorepo.git
   cd Honda-eGo-Monorepo
   ```

2. **Start Infrastructure**:
   ```bash
   docker-compose -f infrastructure/docker/docker-compose.dev.yml up -d
   ```

3. **Backend Services**:
   ```bash
   # Start Eureka Server
   cd backend/eureka-server
   ./mvnw spring-boot:run

   # Start API Gateway
   cd ../api-gateway
   ./mvnw spring-boot:run

   # Start Auth Service
   cd ../auth-service
   ./mvnw spring-boot:run
   ```

4. **Frontend Applications**:
   ```bash
   # Admin Dashboard
   cd web-apps/admin-dashboard
   npm install && npm start

   # Website Client
   cd ../website-client
   npm install && npm run dev

   # Mobile Apps (React Native)
   cd ../../mobile-apps/driver-app
   npm install && npm run android
   ```

## 📱 Applications

### 🚗 Driver Mobile App
- Real-time order notifications
- GPS navigation & tracking
- Earnings dashboard
- Trip history
- Vehicle management

### 👤 Customer Mobile App
- Service booking interface
- Real-time tracking
- Payment integration
- Rating & reviews
- Trip history

### 💼 Admin Dashboard
- User management
- Order monitoring
- Analytics & reports
- System configuration
- Revenue tracking

### 🌐 Marketing Website
- Service information
- Driver/customer registration
- Company information
- Contact & support

## 🔧 Development

### Code Structure
```bash
# Backend API Development
backend/
├── auth-service/          # JWT, user authentication
├── user-service/          # User profiles, preferences
├── order-service/         # Booking, trip management
├── location-service/      # GPS, geofencing
├── payment-service/       # Payment processing
└── notification-service/  # Push notifications, SMS

# Frontend Development
mobile-apps/
├── driver-app/            # Driver interface
└── customer-app/          # Customer interface

web-apps/
├── admin-dashboard/       # Management interface
└── website-client/        # Public website
```

### Database Schema
- **Users**: Drivers, customers, admins
- **Vehicles**: EV fleet management
- **Orders**: Trip requests, bookings
- **Locations**: GPS coordinates, routes
- **Payments**: Transaction records
- **Reviews**: Rating system

### API Endpoints
```bash
# Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh

# Users
GET /api/users/profile
PUT /api/users/profile
GET /api/users/drivers/nearby

# Orders
POST /api/orders/create
GET /api/orders/history
PUT /api/orders/{id}/status

# Locations
POST /api/locations/update
GET /api/locations/route
```

## 🧪 Testing

```bash
# Backend Tests
cd backend/auth-service
./mvnw test

# Frontend Tests
cd web-apps/admin-dashboard
npm test

# Integration Tests
cd tests/integration
npm run test:integration

# E2E Tests
cd tests/e2e
npm run test:e2e
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build all services
docker-compose -f infrastructure/docker/docker-compose.prod.yml build

# Deploy
docker-compose -f infrastructure/docker/docker-compose.prod.yml up -d
```

### Kubernetes Deployment
```bash
# Apply configurations
kubectl apply -f infrastructure/k8s/

# Check status
kubectl get pods -n honda-ego
```

## 📊 Monitoring & Observability

- **Metrics**: Prometheus + Grafana
- **Logging**: ELK Stack
- **Tracing**: Jaeger
- **Health Checks**: Spring Boot Actuator
- **Error Tracking**: Sentry

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 Documentation

- [API Documentation](docs/api/README.md)
- [Mobile App Guide](docs/mobile/README.md)
- [Deployment Guide](docs/deployment/README.md)
- [Contributing Guide](docs/contributing/README.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Backend**: Spring Boot Microservices
- **Mobile**: React Native Development
- **Frontend**: React/Next.js Development
- **DevOps**: Infrastructure & Deployment

## 🔗 Links

- [Live Demo](https://honda-ego.example.com)
- [API Documentation](https://api.honda-ego.example.com/docs)
- [Admin Dashboard](https://admin.honda-ego.example.com)

---

<div align="center">
  <p>Built with ❤️ for the future of electric vehicle services</p>
  <p>Honda eGo - Drive Electric, Drive Smart 🚗⚡</p>
</div>
