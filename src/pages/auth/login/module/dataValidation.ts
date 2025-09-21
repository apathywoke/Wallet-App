import { z } from 'zod';

// Создаем функцию для создания схемы с переводами
export const createLoginSchema = (t: any) => z.object({
  email: z.string().email(t.validation.emailInvalid).min(1, t.validation.required),
  password: z.string().min(7, t.validation.passwordTooShort),
});

// Базовая схема для случаев, когда переводы недоступны
export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(7),
});

export type LoginFormFillRequiring = z.infer<typeof loginSchema>;