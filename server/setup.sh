#!/bin/bash

echo "🚀 Настройка Wallet App..."

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Запустите скрипт из корневой директории проекта"
    exit 1
fi

# Устанавливаем зависимости фронтенда
echo "📦 Устанавливаем зависимости фронтенда..."
npm install

# Устанавливаем зависимости бэкенда
echo "📦 Устанавливаем зависимости бэкенда..."
cd server
npm install

# Создаём .env файл из примера
if [ ! -f ".env" ]; then
    echo "🔧 Создаём .env файл..."
    cp .env.example .env
    echo "✅ .env файл создан из .env.example"
    echo "⚠️  ВАЖНО: Отредактируйте server/.env файл с вашими реальными данными!"
else
    echo "ℹ️  .env файл уже существует"
fi

cd ..

echo ""
echo "✅ Настройка завершена!"
echo ""
echo "📝 Следующие шаги:"
echo "1. Отредактируйте server/.env с вашими данными"
echo "2. Запустите бэкенд: cd server && npm run dev"
echo "3. Запустите фронтенд: npm run dev"
echo ""
