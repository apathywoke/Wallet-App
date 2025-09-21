import type { Translations } from '../types';

export const en: Translations = {
  common: {
    walletApp: 'Wallet App',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    login: 'Log In',
    register: 'Register',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    forgotPassword: 'Forgot your password?',
    welcome: 'Welcome',
    welcomeBack: 'Welcome Back',
    chooseLoginMethod: 'Choose a login method',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  
  auth: {
    loginTitle: 'Welcome Back',
    registerTitle: 'Create Account',
    loginButton: 'Log In',
    registerButton: 'Register',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    loginSuccess: 'Welcome back!',
    registerSuccess: 'Registration successful! Welcome!',
    invalidCredentials: 'Invalid email or password. Please try again.',
    userExists: 'User with this email already exists',
    serverError: 'Unable to connect to server. Please check your internet connection.',
    networkError: 'Network error occurred',
  },
  
  notFound: {
    title: 'Page Not Found',
    subtitle: 'Sorry, the requested page does not exist or has been moved',
    backToHome: 'Back to Home',
    createAccount: 'Create Account',
  },
  
  validation: {
    required: 'This field is required',
    emailInvalid: 'Please enter a valid email address',
    passwordTooShort: 'Password must be at least 8 characters',
    passwordComplexity: 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    passwordsNotMatch: 'Passwords must match',
  },
};
