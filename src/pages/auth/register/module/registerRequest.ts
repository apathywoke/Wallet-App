import { useMutation } from '@tanstack/react-query'
import type { RegisterFormFillRequiring } from '@/pages/auth/register/module/dataValidation.ts';

export const RegisterRequest = () => {
  return useMutation({
    mutationFn: async (data: RegisterFormFillRequiring) => {
      const res = await fetch("/api/register/", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    }
  })
}