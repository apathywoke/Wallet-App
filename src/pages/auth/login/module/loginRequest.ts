/**
 * API запрос для входа в систему
 * 
 * Основные функции:
 * - Отправка данных входа на сервер
 * - Обработка ответа и сохранение токена в Redux
 * - Навигация на главную страницу при успехе
 * - Показ toast уведомлений об ошибках/успехе
 * - Обработка различных типов ошибок (401, 423, 403, 429)
 */

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/entities/user/model/slice';
import type { LoginFormFillRequiring } from './dataValidation';
import { ENDPOINTS } from '@/shared/api/config';
import { useToastContext } from '@/app/providers/ToastProvider';
import { useTranslation } from '@/shared/lib/i18n';

// Интерфейс ответа сервера при успешном входе
interface LoginResponse {
  token: string;    // JWT токен для авторизации
  user: {
    id: string;     // ID пользователя
    email: string;  // Email пользователя
  }
}

/**
 * Хук для выполнения запроса входа
 * @returns объект с функцией мутации и состоянием загрузки
 */
export const LoginRequest = () => {
  const navigate = useNavigate();        // Для навигации после успешного входа
  const dispatch = useDispatch();        // Для обновления Redux store
  const { showError, showSuccess } = useToastContext(); // Для показа уведомлений
  const { t } = useTranslation();        // Для переводов сообщений об ошибках

  return useMutation({
    mutationFn: async (data: LoginFormFillRequiring) => {
      try {
        const response = await axios.post<LoginResponse>(
          ENDPOINTS.LOGIN,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            throw new Error(error.response.data.error || 'Login failed');
          } else if (error.request) {
            throw new Error('Network error');
          } else {
            throw new Error('Request setup error');
          }
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);

      dispatch(login({
        id: data.user.id,
        email: data.user.email,
        token: data.token,
      }));

      showSuccess(t.auth.loginSuccess);
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          showError(t.auth.invalidCredentials);
        } else if (error.response?.status === 423) {
          showError('Account is temporarily locked due to too many failed attempts. Please try again later.');
        } else if (error.response?.status === 403) {
          showError('Account is deactivated. Please contact support.');
        } else if (error.response?.status === 429) {
          showError('Too many login attempts. Please try again later.');
        } else if (error.response?.data?.error) {
          showError(error.response.data.error);
        } else if (error.request) {
          showError(t.auth.serverError);
        } else {
          showError(t.auth.networkError);
        }
      } else if (error instanceof Error) {
        showError(error.message);
      } else {
        showError(t.auth.networkError);
      }
    },
  });
};