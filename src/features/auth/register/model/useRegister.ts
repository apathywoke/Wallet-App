/**
 * Simple register hook
 * 
 * Handles registration with API integration, state management, and navigation
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/entities/user/model/slice';
import { registerUser } from '@/shared/api';
import { useToastContext } from '@/app/providers/ToastProvider';
import { useTranslation } from '@/shared/lib/i18n';
import type { RegisterRequest } from '@/shared/api';

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToastContext();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      return await registerUser(data);
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken); // Persist auth token
      
      dispatch(login({ // Update user state
        id: data.user.id,
        email: data.user.email,
        token: data.accessToken,
      }));

      showSuccess(t.auth.registerSuccess); // Show success toast
      navigate('/dashboard'); // Redirect to dashboard
    },
    onError: (error: unknown) => {
      if (!(error instanceof Error)) {
        showError(t.auth.networkError);
        return;
      }

      const message = error.message.toLowerCase();
      
      // Handle specific error types
      if (message.includes('409') || message.includes('already exists')) {
        showError(t.auth.userExists);
      } else if (message.includes('400') || message.includes('invalid request')) {
        showError('Registration failed. Please check your input.');
      } else if (message.includes('429')) {
        showError('Too many registration attempts. Try again later.');
      } else if (message.includes('network error')) {
        showError(t.auth.networkError);
      } else {
        showError(error.message); // Show server error message
      }
    },
  });
};
