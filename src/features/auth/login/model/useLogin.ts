/**
 * Simple login hook
 * 
 * Handles login with API integration, state management, and navigation
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/entities/user/model/slice';
import { loginUser } from '@/shared/api';
import { useToastContext } from '@/app/providers/ToastProvider';
import { useTranslation } from '@/shared/lib/i18n';
import type { LoginRequest } from '@/shared/api';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToastContext();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      return await loginUser(data);
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken); // Persist auth token
      
      dispatch(login({ // Update user state
        id: data.user.id,
        email: data.user.email,
        token: data.accessToken,
      }));

      showSuccess(t.auth.loginSuccess); // Show success toast
      navigate('/dashboard'); // Redirect to dashboard
    },
    onError: (error: unknown) => {
      if (!(error instanceof Error)) {
        showError(t.auth.networkError);
        return;
      }

      const message = error.message.toLowerCase();
      
      // Handle specific error types
      if (message.includes('401') || message.includes('unauthorized') || message.includes('invalid email or password')) {
        showError(t.auth.invalidCredentials);
      } else if (message.includes('423') || message.includes('temporarily locked')) {
        showError('Account temporarily locked. Try again later.');
      } else if (message.includes('403') || message.includes('deactivated')) {
        showError('Account deactivated. Contact support.');
      } else if (message.includes('429') || message.includes('too many')) {
        showError('Too many login attempts. Try again later.');
      } else if (message.includes('network error') || message.includes('network')) {
        showError(t.auth.networkError);
      } else {
        showError(error.message); // Show server error message
      }
    },
  });
};
