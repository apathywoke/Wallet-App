#!/bin/bash

echo "💳 Schizo Wallet App - Setup Script"
echo "=================================="
echo ""

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "🔍 Checking system requirements..."

# Проверяем версию Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) - OK"

# Устанавливаем зависимости фронтенда
echo ""
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Устанавливаем зависимости бэкенда
echo ""
echo "📦 Installing backend dependencies..."
cd server
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Создаём .env файл из примера
echo ""
echo "🔧 Setting up environment variables..."

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env file from .env.example"
        echo "⚠️  IMPORTANT: Please edit server/.env with your real credentials!"
    else
        echo "❌ .env.example file not found"
        exit 1
    fi
else
    echo "ℹ️  .env file already exists - skipping"
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit server/.env with your MongoDB and JWT credentials"
echo "2. Start the backend: npm run dev:server"
echo "3. Start the frontend: npm run dev:client"
echo ""
echo "🌐 Application will be available at:"
echo "   Frontend: http://localhost:3001"
echo "   Backend:  http://localhost:5002"
echo ""
echo "📚 For more information, see README.md"
echo ""
echo "⭐ Star the repo if you find it helpful!"
echo "   https://github.com/schizo/wallet-app"
echo ""