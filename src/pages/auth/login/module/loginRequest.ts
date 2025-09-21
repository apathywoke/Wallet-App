import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/entities/user/model/slice';
import type { LoginFormFillRequiring } from './dataValidation';
import { ENDPOINTS } from '@/shared/api/config';
import { useToastContext } from '@/app/providers/ToastProvider';
import { useTranslation } from '@/shared/lib/i18n';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  }
}

export const LoginRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToastContext();
  const { t } = useTranslation();

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
      if (error instanceof Error) {
        if (error.message === 'Invalid credentials') {
          showError(t.auth.invalidCredentials);
        } else if (error.message === 'Network error') {
          showError(t.auth.serverError);
        } else {
          showError(error.message);
        }
      } else {
        showError(t.auth.networkError);
      }
    },
  });
};