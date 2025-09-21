export type Language = 'en' | 'ru' | 'es' | 'fr' | 'de' | 'zh';

export interface Translations {
  // Common
  common: {
    walletApp: string;
    email: string;
    password: string;
    confirmPassword: string;
    login: string;
    register: string;
    signIn: string;
    signUp: string;
    forgotPassword: string;
    welcome: string;
    welcomeBack: string;
    chooseLoginMethod: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
  };
  
  // Auth pages
  auth: {
    loginTitle: string;
    registerTitle: string;
    loginButton: string;
    registerButton: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    loginSuccess: string;
    registerSuccess: string;
    invalidCredentials: string;
    userExists: string;
    serverError: string;
    networkError: string;
  };
  
  // 404 page
  notFound: {
    title: string;
    subtitle: string;
    backToHome: string;
    createAccount: string;
  };
  
  // Validation
  validation: {
    required: string;
    emailInvalid: string;
    passwordTooShort: string;
    passwordsNotMatch: string;
  };
}

export type TranslationKey = keyof Translations | `${keyof Translations}.${string}`;
