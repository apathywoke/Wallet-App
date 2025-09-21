import { z } from 'zod';

// Создаем функцию для создания схемы с переводами
export const createRegisterSchema = (t: any) => z.object({
  email: z.string().email(t.validation.emailInvalid).min(1, t.validation.required),
  password: z.string().min(7, t.validation.passwordTooShort),
  confirmPassword: z.string().min(7, t.validation.passwordTooShort),
})
.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: t.validation.passwordsNotMatch,
      path: ["confirmPassword"],
    });
  }
});

// Базовая схема для случаев, когда переводы недоступны
export const registerSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(7),
  confirmPassword: z.string().min(7),
})
.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords must match",
      path: ["confirmPassword"],
    });
  }
});

export type RegisterFormFillRequiring = z.infer<typeof registerSchema>;