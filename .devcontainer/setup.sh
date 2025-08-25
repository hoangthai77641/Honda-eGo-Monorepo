#!/bin/bash

echo "🚀 Setting up Honda eGo development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Update system packages
print_status "Updating system packages..."
sudo apt-get update -qq

# Install additional development tools
print_status "Installing development tools..."
sudo apt-get install -y -qq \
    curl \
    wget \
    git \
    htop \
    tree \
    jq \
    build-essential \
    postgresql-client \
    redis-tools

# Install Android SDK for React Native development
print_status "Setting up Android development environment..."
if [ ! -d "$HOME/Android" ]; then
    mkdir -p $HOME/Android/Sdk
    
    # Set Android environment variables
    echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.bashrc
    echo 'export PATH=$PATH:$ANDROID_HOME/emulator' >> ~/.bashrc
    echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.bashrc
    echo 'export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin' >> ~/.bashrc
    
    # Download Android command line tools
    cd $HOME/Android/Sdk
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
    unzip -q commandlinetools-linux-9477386_latest.zip
    mkdir -p cmdline-tools/latest
    mv cmdline-tools/* cmdline-tools/latest/ 2>/dev/null || true
    rm commandlinetools-linux-9477386_latest.zip
    
    print_success "Android SDK environment configured"
else
    print_warning "Android SDK already exists"
fi

# Install global npm packages
print_status "Installing global npm packages..."
npm install -g \
    @react-native-community/cli \
    expo-cli \
    @expo/cli \
    typescript \
    ts-node \
    nodemon \
    concurrently \
    rimraf

# Install global Java tools
print_status "Setting up Java development tools..."
if command -v sdk &> /dev/null; then
    sdk install maven
    sdk install gradle
else
    print_warning "SDKMAN not available, skipping additional Java tools"
fi

# Setup project directories
print_status "Creating project directory structure..."
mkdir -p /workspace/{backend,mobile-apps,web-apps,shared,infrastructure,docs,scripts,tests}

# Create useful aliases
print_status "Setting up development aliases..."
cat >> ~/.bashrc << 'EOF'

# Honda eGo Development Aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'

# Project specific aliases
alias backend='cd /workspace/backend'
alias mobile='cd /workspace/mobile-apps'
alias web='cd /workspace/web-apps'
alias infra='cd /workspace/infrastructure'

# Development shortcuts
alias start-backend='cd /workspace && docker-compose -f infrastructure/docker/docker-compose.dev.yml up -d'
alias stop-backend='cd /workspace && docker-compose -f infrastructure/docker/docker-compose.dev.yml down'
alias logs-backend='cd /workspace && docker-compose -f infrastructure/docker/docker-compose.dev.yml logs -f'

# Database shortcuts
alias psql-honda='psql -h localhost -U postgres -d honda_ego_db'
alias redis-cli-honda='redis-cli -h localhost -p 6379'

# Git shortcuts
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git pull'
alias gco='git checkout'
alias gb='git branch'

EOF

# Setup development database
print_status "Setting up development database..."
if command -v psql &> /dev/null; then
    # Wait for PostgreSQL to be ready
    until pg_isready -h localhost -p 5432 -U postgres; do
        print_status "Waiting for PostgreSQL to start..."
        sleep 2
    done
    
    # Create development database and user
    PGPASSWORD=password psql -h localhost -U postgres -c "CREATE DATABASE IF NOT EXISTS honda_ego_dev;" 2>/dev/null || true
    PGPASSWORD=password psql -h localhost -U postgres -c "CREATE DATABASE IF NOT EXISTS honda_ego_test;" 2>/dev/null || true
    
    print_success "Development databases created"
else
    print_warning "PostgreSQL client not available, skipping database setup"
fi

# Create development configuration files
print_status "Creating development configuration files..."

# Create backend application.yml template
mkdir -p /workspace/backend/shared/config
cat > /workspace/backend/shared/config/application-dev.yml << 'EOF'
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/honda_ego_dev
    username: postgres
    password: password
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
  
  redis:
    host: localhost
    port: 6379
    timeout: 2000ms
  
  security:
    jwt:
      secret: honda-ego-development-secret-key-change-in-production
      expiration: 86400000

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true

logging:
  level:
    com.honda.ego: DEBUG
    org.springframework.security: DEBUG
EOF

# Create mobile app environment template
mkdir -p /workspace/mobile-apps/shared/config
cat > /workspace/mobile-apps/shared/config/.env.development << 'EOF'
# Honda eGo Mobile Development Configuration
API_BASE_URL=http://localhost:8080/api
WS_BASE_URL=ws://localhost:8080/ws
ENVIRONMENT=development

# Google Maps (replace with your API key)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Firebase (replace with your config)
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=honda-ego-dev.firebaseapp.com
FIREBASE_PROJECT_ID=honda-ego-dev

# Analytics
ENABLE_ANALYTICS=false
DEBUG_MODE=true
EOF

# Setup git hooks
print_status "Setting up git hooks..."
mkdir -p /workspace/.git/hooks
cat > /workspace/.git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Honda eGo pre-commit hook

echo "Running pre-commit checks..."

# Check if this is initial commit
if git rev-parse --verify HEAD >/dev/null 2>&1
then
    against=HEAD
else
    # Initial commit: diff against an empty tree object
    against=$(git hash-object -t tree /dev/null)
fi

# Run linting for modified files
git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|jsx|ts|tsx)$' | xargs npx eslint --fix 2>/dev/null || true
git diff --cached --name-only --diff-filter=ACM | grep -E '\.(java)$' | xargs mvn spotless:apply 2>/dev/null || true

# Add back any files that were fixed
git add .

echo "Pre-commit checks completed!"
EOF

chmod +x /workspace/.git/hooks/pre-commit

# Final setup
print_status "Finalizing setup..."
source ~/.bashrc

# Display success message
print_success "Honda eGo development environment setup completed! 🎉"
echo ""
echo "🚗 Honda eGo Development Environment Ready!"
echo "=================================================="
echo "📁 Workspace: /workspace"
echo "🗄️  Database: PostgreSQL (localhost:5432)"
echo "🔄 Cache: Redis (localhost:6379)"
echo "🌐 API Gateway: http://localhost:8080"
echo "📊 Eureka Server: http://localhost:8761"
echo ""
echo "🛠️  Available commands:"
echo "  start-backend  - Start all backend services"
echo "  stop-backend   - Stop all backend services"
echo "  psql-honda     - Connect to PostgreSQL"
echo "  redis-cli-honda - Connect to Redis"
echo ""
echo "📚 Documentation: /workspace/docs"
echo "🔧 Scripts: /workspace/scripts"
echo ""
echo "Happy coding! 🚀"
