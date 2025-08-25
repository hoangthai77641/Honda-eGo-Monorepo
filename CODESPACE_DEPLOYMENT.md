# 🚀 Honda eGo Codespace Deployment Guide

## ✅ Sẵn sàng triển khai GitHub Codespace!

Honda-eGo-Monorepo đã được cấu hình đầy đủ và sẵn sàng cho GitHub Codespace development.

## 🎯 Quick Start - Deploy Codespace

### Method 1: Via GitHub Web Interface (Recommended)

1. **Truy cập Repository**:
   ```
   https://github.com/hoangthai77641/Honda-eGo-Monorepo
   ```

2. **Create Codespace**:
   - Click nút **"Code"** (màu xanh)
   - Chọn tab **"Codespaces"**
   - Click **"Create codespace on main"**
   - Chờ 2-3 phút để environment setup

3. **Auto-Configuration**:
   - ✅ Java 17 + Maven installed
   - ✅ Node.js 18 + npm/yarn installed
   - ✅ Docker-in-Docker enabled
   - ✅ PostgreSQL + Redis containers started
   - ✅ VS Code extensions loaded
   - ✅ All services ready to run

### Method 2: Via GitHub CLI

```bash
# Install GitHub CLI if not installed
gh auth login

# Create Codespace
gh codespace create --repo hoangthai77641/Honda-eGo-Monorepo

# Or create with specific machine type
gh codespace create --repo hoangthai77641/Honda-eGo-Monorepo --machine basicLinux32gb
```

### Method 3: Direct URL

```
https://codespaces.new/hoangthai77641/Honda-eGo-Monorepo
```

## 🛠️ What Happens During Codespace Startup

### 1. Base Environment (30 seconds)
- Pull Universal DevContainer image
- Setup basic tools and utilities

### 2. Feature Installation (60-90 seconds)
- Java 17 + Maven installation
- Node.js 18 + npm/yarn setup
- Docker-in-Docker configuration
- GitHub CLI installation

### 3. Service Startup (30-60 seconds)
- PostgreSQL container start
- Redis container start
- Health checks validation

### 4. Post-Create Commands (30 seconds)
- Environment variables setup
- Development aliases configuration
- Git hooks installation
- Dependencies installation

### 5. Ready to Code! (Total: 2-3 minutes)

## 🔧 Services Available After Startup

### Backend Services:
```bash
# Database
PostgreSQL: localhost:5432
  - Database: honda_ego_db
  - User: postgres
  - Password: password

Redis: localhost:6379
  - Cache and session storage

# Microservices Ports
Eureka Server: 8761
API Gateway: 8080
Auth Service: 8081
User Service: 8082
Order Service: 8083
Location Service: 8084
```

### Frontend Services:
```bash
# Web Applications
Admin Dashboard: 3000
Website Client: 3001

# Mobile Development
Metro Bundler: 8081
Expo Dev: 19000, 19001
```

### Development Tools:
```bash
# Monitoring
Prometheus: 9090
Grafana: 3002 (admin/admin123)

# Database Tools
psql-honda        # Connect to PostgreSQL
redis-cli-honda   # Connect to Redis
```

## 🚀 Development Commands

### Start All Services:
```bash
# Quick start all services
npm run dev

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend

# Start mobile development
npm run dev:mobile
```

### Individual Service Management:
```bash
# Backend services
cd backend/eureka-server && ./mvnw spring-boot:run
cd backend/api-gateway && ./mvnw spring-boot:run
cd backend/auth-service && ./mvnw spring-boot:run

# Frontend applications
cd web-apps/admin-dashboard && npm run dev
cd web-apps/website-client && npm run dev

# Mobile applications
cd mobile-apps/driver-app && npm run android
cd mobile-apps/customer-app && npm run android
```

### Testing:
```bash
# Run all tests
npm test

# Test individual components
npm run test:frontend
npm run test:mobile
npm run test:integration
```

## 💻 Codespace Machine Types

### Recommended Configurations:

#### For Individual Development:
- **Machine**: 4-core, 16GB RAM
- **Cost**: ~$0.18/hour
- **Use case**: Single developer, basic testing

#### For Team Development:
- **Machine**: 8-core, 32GB RAM  
- **Cost**: ~$0.36/hour
- **Use case**: Multiple services, heavy development

#### For Performance Testing:
- **Machine**: 16-core, 64GB RAM
- **Cost**: ~$0.72/hour
- **Use case**: Load testing, full system simulation

## 🔒 Security & Access

### Repository Access:
- ✅ **Public Repository**: Anyone can view
- ✅ **Codespace Access**: Only repository collaborators
- ✅ **Environment Secrets**: Configured in repository settings

### Development Secrets:
```bash
# Add secrets in GitHub repository settings:
# Settings → Secrets and variables → Codespaces

# Required secrets for production:
DATABASE_PASSWORD=your_production_password
REDIS_PASSWORD=your_redis_password
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_maps_key
FIREBASE_API_KEY=your_firebase_key
```

## 📊 Monitoring & Troubleshooting

### Health Checks:
```bash
# Service health endpoints
curl http://localhost:8761/actuator/health  # Eureka
curl http://localhost:8080/actuator/health  # Gateway
curl http://localhost:8081/actuator/health  # Auth Service

# Database connectivity
pg_isready -h localhost -p 5432 -U postgres
redis-cli -h localhost -p 6379 ping
```

### Common Issues & Solutions:

#### Issue 1: Port Already in Use
```bash
# Check running processes
netstat -tulpn | grep :8080
kill -9 <process_id>

# Or restart Codespace
gh codespace rebuild
```

#### Issue 2: Database Connection Failed
```bash
# Check PostgreSQL status
docker ps | grep postgres
docker logs honda-ego-postgres

# Restart database
docker-compose -f infrastructure/docker/docker-compose.dev.yml restart postgres
```

#### Issue 3: Out of Space
```bash
# Clean Docker images
docker system prune -a

# Clean npm cache
npm cache clean --force

# Clean Maven dependencies
mvn clean
```

## 📈 Performance Tips

### Optimize Codespace Performance:
1. **Prebuilds**: Enable for faster startup
2. **Resource Allocation**: Use appropriate machine size
3. **Service Startup**: Start only needed services
4. **Cache Management**: Regular cleanup of caches

### Development Best Practices:
1. **Hot Reload**: Configured for all frontend services
2. **Live Reload**: Backend services with Spring DevTools
3. **Auto-Save**: VS Code auto-save enabled
4. **Git Integration**: Pre-commit hooks configured

## 🎯 Next Steps After Codespace Launch

### 1. Verify Environment:
```bash
# Check versions
java --version    # Should be 17
node --version    # Should be 18.x
docker --version  # Should be latest

# Check database
psql-honda -c "SELECT version();"
redis-cli-honda info server
```

### 2. Start Development:
```bash
# Backend development
cd backend/auth-service
./mvnw spring-boot:run

# Frontend development  
cd web-apps/admin-dashboard
npm install && npm run dev

# Mobile development
cd mobile-apps/driver-app
npm install && npm run android
```

### 3. Access Applications:
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761  
- **Admin Dashboard**: http://localhost:3000
- **Website Client**: http://localhost:3001
- **Grafana Monitoring**: http://localhost:3002

## ✅ Success Indicators

Your Codespace is ready when you see:
- ✅ All ports forwarded and accessible
- ✅ Database connections successful
- ✅ Services responding to health checks
- ✅ VS Code extensions loaded
- ✅ Terminal shows "Honda eGo development environment ready! 🚗⚡"

## 🆘 Support & Resources

### Documentation:
- [GitHub Codespaces Docs](https://docs.github.com/en/codespaces)
- [DevContainer Reference](https://containers.dev/implementors/json_reference/)
- [Honda eGo Architecture Guide](./docs/ARCHITECTURE.md)

### Getting Help:
- **GitHub Issues**: Report bugs and feature requests
- **Discussions**: Ask questions and share ideas
- **Wiki**: Detailed development guides

---

## 🚀 Ready to Launch Codespace!

**Honda-eGo-Monorepo is fully configured and ready for GitHub Codespace deployment.**

**Next Step**: Click the "Create Codespace" button and start developing! 🎯

---

*Honda eGo - Drive Electric, Code Smart! 🚗⚡*
