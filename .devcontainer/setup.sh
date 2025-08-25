#!/bin/bash

echo "🚀 Setting up Honda eGo development environment..."

# Simple setup script for GitHub Codespace
set -e

# Update system packages
echo "📦 Updating system packages..."
sudo apt-get update -qq

# Install essential development tools
echo "🛠️ Installing development tools..."
sudo apt-get install -y -qq curl wget git htop tree jq postgresql-client redis-tools

# Install global npm packages
echo "📱 Installing global npm packages..."
npm install -g @react-native-community/cli expo-cli typescript nodemon concurrently

# Setup development directories
echo "📁 Creating project directories..."
mkdir -p /workspace/{backend,mobile-apps,web-apps,shared,infrastructure,docs,scripts,tests}

# Create useful aliases  
echo "⚙️ Setting up development aliases..."
cat >> ~/.bashrc << 'EOF'

# Honda eGo Development Aliases
alias ll='ls -alF'
alias backend='cd /workspace/backend'
alias mobile='cd /workspace/mobile-apps'
alias web='cd /workspace/web-apps'
alias psql-honda='psql -h localhost -U postgres -d honda_ego_db'
alias redis-cli-honda='redis-cli -h localhost -p 6379'
alias gs='git status'
alias gc='git commit'
alias gp='git push'
EOF

# Final setup
echo "✅ Honda eGo development environment ready!"
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
echo "  psql-honda     - Connect to PostgreSQL"
echo "  redis-cli-honda - Connect to Redis"
echo "  backend        - Go to backend directory"
echo "  mobile         - Go to mobile apps directory"
echo "  web            - Go to web apps directory"
echo ""
echo "Happy coding! 🚀"
