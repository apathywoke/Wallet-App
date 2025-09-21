import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/entities/user/model/slice';
import type { RegisterFormFillRequiring } from './dataValidation';
import { ENDPOINTS } from '@/shared/api/config';
import { useToastContext } from '@/app/providers/ToastProvider';
import { useTranslation } from '@/shared/lib/i18n';

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
  }
}

export const RegisterRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToastContext();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (data: RegisterFormFillRequiring) => {
      try {
        const response = await axios.post<RegisterResponse>(
          ENDPOINTS.REGISTER,
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
            throw new Error(error.response.data.error || 'Registration failed');
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

      showSuccess(t.auth.registerSuccess);
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          showError(t.auth.userExists);
        } else if (error.response?.status === 400) {
          const errorData = error.response.data;
          if (errorData.details && Array.isArray(errorData.details)) {
            // Show first validation error
            showError(errorData.details[0].message);
          } else if (errorData.error) {
            showError(errorData.error);
          } else {
            showError('Registration failed. Please check your input.');
          }
        } else if (error.response?.status === 429) {
          showError('Too many registration attempts. Please try again later.');
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