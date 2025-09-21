# 💳 Schizo Wallet App

> **Enterprise-grade digital wallet application with multi-currency support, secure transactions, and modern user experience.**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/schizo/wallet-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)

## 🌟 Features

- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 🌍 **Multi-language Support** - English, Russian, Spanish, French, German, Chinese
- 💱 **Multi-currency Wallet** - Support for multiple digital currencies
- 🎨 **Modern UI/UX** - Responsive design with smooth animations
- 📱 **Mobile-first Design** - Optimized for all device sizes
- 🔔 **Real-time Notifications** - Toast notifications with progress indicators
- 🛡️ **Enterprise Security** - Environment-based configuration, secure API endpoints
- 📊 **Transaction History** - Complete transaction tracking and history

## 🏗️ Architecture

Built with **Feature-Sliced Design (FSD)** architecture for maintainable and scalable codebase.

### Frontend Stack
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Query** for server state management
- **React Router** for navigation
- **SCSS Modules** for styling
- **Rsbuild** for fast development and building

### Backend Stack
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **JWT** for authentication
- **bcrypt** for password security
- **CORS** enabled for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/schizo/wallet-app.git
   cd wallet-app
   ```

2. **Automatic setup** (recommended)
   ```bash
   npm run setup
   ```

3. **Manual setup**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   
   # Setup environment variables
   cp .env.example .env
   ```

4. **Configure environment variables**
   
   Edit `server/.env` with your credentials:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wallet-app
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5002
   NODE_ENV=development
   ```

5. **Start the application**
   
   **Terminal 1 (Backend API):**
   ```bash
   npm run dev:server
   ```
   
   **Terminal 2 (Frontend):**
   ```bash
   npm run dev:client
   ```

6. **Access the application**
   - Frontend: `http://localhost:3001`
   - Backend API: `http://localhost:5002`

## 📁 Project Structure

```
wallet-app/
├── src/
│   ├── app/           # Application configuration
│   ├── pages/         # Application pages
│   ├── entities/      # Business entities
│   ├── shared/        # Shared utilities and components
│   └── index.tsx      # Application entry point
├── server/
│   ├── models/        # Database models
│   ├── index.js       # Server entry point
│   └── package.json   # Backend dependencies
├── public/            # Static assets
└── package.json       # Frontend dependencies
```

## 🛡️ Security Features

- **Environment Variables** - Sensitive data stored in `.env` files
- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based authentication
- **CORS Protection** - Configured for specific origins
- **Input Validation** - Comprehensive form validation
- **Error Handling** - Secure error messages

## 🌍 Internationalization

Supports 6 languages with automatic browser language detection:
- 🇺🇸 English
- 🇷🇺 Русский (Russian)
- 🇪🇸 Español (Spanish)
- 🇫🇷 Français (French)
- 🇩🇪 Deutsch (German)
- 🇨🇳 中文 (Chinese)

## 🎨 UI/UX Features

- **Smooth Animations** - CSS transitions and transforms
- **Toast Notifications** - With progress bars and auto-dismiss
- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Professional dark color scheme
- **Loading States** - Visual feedback for user actions
- **Error Boundaries** - Graceful error handling

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile (protected)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Schizo**
- Website: [https://wallet-app.schizo.dev](https://wallet-app.schizo.dev)
- GitHub: [@schizo](https://github.com/schizo)
- Email: schizo@walletapp.com

## 🙏 Acknowledgments

- Thanks to the React and Node.js communities
- MongoDB Atlas for reliable database hosting
- All contributors who help improve this project

---

⭐ **Star this repo if you find it helpful!**