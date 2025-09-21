/**
 * Валидация данных для формы входа
 * 
 * Использует Zod для валидации:
 * - Email: обязательное поле, правильный формат, приведение к нижнему регистру
 * - Password: обязательное поле
 * 
 * Поддерживает многоязычность через i18n
 */

import { z } from 'zod';

/**
 * Создает схему валидации для входа с переводами
 * @param t - объект с переводами
 * @returns Zod схема валидации
 */
export const createLoginSchema = (t: any) => z.object({
  // Валидация email
  email: z.string()
    .email(t.validation.emailInvalid)  // Проверка формата email
    .min(1, t.validation.required)     // Обязательное поле
    .toLowerCase()                     // Приведение к нижнему регистру
    .trim(),                          // Удаление пробелов
    
  // Валидация пароля
  password: z.string()
    .min(1, t.validation.required),    // Обязательное поле
});

// Базовая схема для случаев, когда переводы недоступны (fallback)
export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required')
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(1, 'Password is required'),
});

// Тип данных формы входа (автоматически генерируется из схемы)
export type LoginFormFillRequiring = z.infer<typeof loginSchema>;