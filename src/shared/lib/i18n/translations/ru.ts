import type { Translations } from '../types';

export const ru: Translations = {
  common: {
    walletApp: 'Wallet App',
    email: 'Электронная почта',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    login: 'Войти',
    register: 'Зарегистрироваться',
    signIn: 'Вход',
    signUp: 'Регистрация',
    forgotPassword: 'Забыли пароль?',
    welcome: 'Добро пожаловать',
    welcomeBack: 'С возвращением',
    chooseLoginMethod: 'Выберите способ входа',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
  },
  
  auth: {
    loginTitle: 'С возвращением',
    registerTitle: 'Создать аккаунт',
    loginButton: 'Войти',
    registerButton: 'Зарегистрироваться',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    dontHaveAccount: 'Нет аккаунта?',
    loginSuccess: 'Добро пожаловать!',
    registerSuccess: 'Регистрация прошла успешно! Добро пожаловать!',
    invalidCredentials: 'Неверный email или пароль. Попробуйте еще раз.',
    userExists: 'Пользователь с таким email уже существует',
    serverError: 'Не удается подключиться к серверу. Проверьте интернет соединение.',
    networkError: 'Произошла ошибка сети',
  },
  
  notFound: {
    title: 'Страница не найдена',
    subtitle: 'К сожалению, запрашиваемая страница не существует или была перемещена',
    backToHome: 'Вернуться на главную',
    createAccount: 'Создать аккаунт',
  },
  
  validation: {
    required: 'Это поле обязательно',
    emailInvalid: 'Пожалуйста, введите корректный email адрес',
    passwordTooShort: 'Пароль должен содержать минимум 7 символов',
    passwordsNotMatch: 'Пароли должны совпадать',
  },
};
