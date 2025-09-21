import { z } from 'zod';

// Production-grade password validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Создаем функцию для создания схемы с переводами
export const createRegisterSchema = (t: any) => z.object({
  email: z.string()
    .email(t.validation.emailInvalid)
    .min(1, t.validation.required)
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(8, t.validation.passwordTooShort)
    .regex(passwordRegex, t.validation.passwordComplexity),
  confirmPassword: z.string()
    .min(8, t.validation.passwordTooShort),
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
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required')
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(passwordRegex, 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'),
  confirmPassword: z.string()
    .min(8, 'Password confirmation is required'),
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