#!/bin/bash

# Honda eGo Codespace Health Check Script
echo "🔍 Honda eGo Codespace Health Check"
echo "===================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check functions
check_service() {
    if $1; then
        echo -e "${GREEN}✅ $2${NC}"
        return 0
    else
        echo -e "${RED}❌ $2${NC}"
        return 1
    fi
}

check_port() {
    if netstat -tuln | grep -q ":$1 "; then
        echo -e "${GREEN}✅ Port $1 is open${NC}"
        return 0
    else
        echo -e "${RED}❌ Port $1 is not accessible${NC}"
        return 1
    fi
}

# System checks
echo "🖥️  System Environment:"
check_service "command -v java > /dev/null" "Java 17 installed"
check_service "command -v node > /dev/null" "Node.js 18 installed" 
check_service "command -v docker > /dev/null" "Docker available"
check_service "command -v psql > /dev/null" "PostgreSQL client installed"
check_service "command -v redis-cli > /dev/null" "Redis client installed"

echo ""
echo "🐳 Docker Services:"
check_service "docker ps | grep -q postgres" "PostgreSQL container running"
check_service "docker ps | grep -q redis" "Redis container running"

echo ""
echo "🌐 Network Connectivity:"
check_port "5432"  # PostgreSQL
check_port "6379"  # Redis

echo ""
echo "🔗 Service Health:"
if curl -f http://localhost:8761 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Eureka Server accessible${NC}"
else
    echo -e "${YELLOW}⚠️  Eureka Server not running (normal for initial setup)${NC}"
fi

if curl -f http://localhost:8080 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API Gateway accessible${NC}"
else
    echo -e "${YELLOW}⚠️  API Gateway not running (normal for initial setup)${NC}"
fi

echo ""
echo "📁 Project Structure:"
check_service "[ -d '/workspace/backend' ]" "Backend directory exists"
check_service "[ -d '/workspace/mobile-apps' ]" "Mobile apps directory exists"
check_service "[ -d '/workspace/web-apps' ]" "Web apps directory exists"
check_service "[ -f '/workspace/package.json' ]" "Root package.json exists"

echo ""
echo "🛠️  Development Tools:"
check_service "command -v mvn > /dev/null" "Maven available"
check_service "command -v npm > /dev/null" "NPM available"
check_service "command -v git > /dev/null" "Git available"

echo ""
echo "🎯 Quick Start Commands:"
echo "========================"
echo "📁 Navigate to backend:    cd /workspace/backend"
echo "📱 Navigate to mobile:     cd /workspace/mobile-apps" 
echo "🌐 Navigate to web:        cd /workspace/web-apps"
echo "🗄️  Connect to database:   psql-honda"
echo "🔄 Connect to Redis:       redis-cli-honda"
echo "🚀 Start all services:     npm run dev"
echo ""
echo "🚗⚡ Honda eGo Codespace is ready for development!"
