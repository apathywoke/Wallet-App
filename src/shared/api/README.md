# API Layer Documentation

## Структура

```
src/shared/api/
├── base/
│   └── axios.ts          # Конфигурация Axios клиента
├── endpoints/
│   ├── auth.ts           # API функции для аутентификации
│   └── user.ts           # API функции для пользователей
├── types/
│   ├── auth.ts           # Типы для аутентификации
│   └── user.ts           # Типы для пользователей
└── index.ts              # Централизованные экспорты
```

## Особенности

### Production-ready конфигурация
- Автоматическое добавление токенов авторизации
- Обработка ошибок и повторные запросы
- Таймауты и retry логика
- Перехватчики запросов/ответов

### Типизация
- Полная типизация всех API запросов и ответов
- Типы ошибок для обработки
- Generic типы для переиспользования

### Обработка ошибок
- Централизованная обработка ошибок
- Специфичные сообщения для разных HTTP статусов
- Автоматическое перенаправление при 401 ошибках

## Использование

```typescript
import { loginUser, registerUser, getUserProfile } from '@/shared/api';

// Логин
const loginData = await loginUser({ email, password });

// Регистрация
const registerData = await registerUser({ email, password, confirmPassword });

// Получение профиля
const profile = await getUserProfile();
```

## Переменные окружения

```env
VITE_API_URL=http://localhost:5002/api
```
