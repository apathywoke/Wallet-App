/**
 * Компонент страницы регистрации
 * 
 * Основные функции:
 * - Отображение формы регистрации с валидацией
 * - Проверка совпадения паролей
 * - Обработка отправки данных на сервер
 * - Навигация между страницами входа и регистрации
 * - Поддержка многоязычности (i18n)
 * - Toast уведомления об ошибках/успехе
 */

import type { FC } from "react";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type RegisterFormFillRequiring,
  registerSchema,
} from '@/pages/auth/register/module/dataValidation.ts';
import { RegisterRequest } from '@/pages/auth/register/module/registerRequest';

import { Link } from 'react-router-dom';
import clsx from "clsx";

import styles from "@/shared/styles/sign.module.scss";

import { Button } from "@/shared/ui/button";
import { FormWrapper } from '@/shared/ui/form';
import { InputField } from '@/shared/ui/input';
import { useTranslation } from "@/shared/lib/i18n";

export const Register: FC = () => {
  // Получаем функцию перевода для текущего языка
  const { t } = useTranslation();
  
  // Хук для выполнения запроса регистрации (с loading состоянием)
  const { mutateAsync, isPending } = RegisterRequest();

  // Настройка формы с валидацией через Zod
  const {
    register,        // Регистрация полей формы
    handleSubmit,    // Обработчик отправки формы
    formState: { errors }, // Ошибки валидации
  } = useForm<RegisterFormFillRequiring>({
    resolver: zodResolver(registerSchema), // Схема валидации
    mode: "onChange", // Валидация при изменении полей
  })

  // Обработчик отправки формы - вызывает API запрос
  const onSubmit = async (data: RegisterFormFillRequiring)=> {
    await mutateAsync(data);
  }

  return (
    <main className={clsx(styles.fullMinHeight, styles.authPage, styles.columnDirection)}>
      {/* Логотип и название приложения */}
      <div className={clsx(styles.gapping, styles.rowDirection, styles.itemsCenter)}>
        <div className={styles.circle}></div>
        <h2>{t.common.walletApp}</h2>
      </div>

      {/* Основная форма регистрации */}
      <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter)}>

        {/* Заголовок и подзаголовок */}
        <div className={styles.headingSection}>
          <h1 className={clsx(styles.heading, styles.textCenter)}>{t.auth.registerTitle}</h1>
          <h2 className={clsx(styles.subHeading, styles.textCenter)}>{t.common.chooseLoginMethod}</h2>
        </div>

        {/* Переключатель между входом и регистрацией */}
        <div className={styles.signButtons}>
          <Button variant={"primary"} size={"small"} className={styles.inactive}>
            <Link to="/sign-in" className={styles.forLink}>{t.common.signIn}</Link>
          </Button>
          <Button variant={"primary"} size={"small"} className={styles.active}>
            {t.common.signUp}
          </Button>
        </div>

        {/* Форма с полями ввода */}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {/* Поле email с валидацией */}
          <InputField
            placeHolder={t.common.email}
            type={"email"}
            error={!!errors.email}
            errorMessage={errors.email?.message}
            {...register("email")}
          />
          {/* Поле пароля с валидацией */}
          <InputField
            placeHolder={t.common.password}
            type={"password"}
            error={!!errors.password}
            errorMessage={errors.password?.message}
            {...register("password")}
          />
          {/* Поле подтверждения пароля с валидацией */}
          <InputField
            placeHolder={t.common.confirmPassword}
            type={"password"}
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          {/* Кнопка регистрации с loading состоянием */}
          <Button variant={"sign"} size={"large"} loading={isPending}>
            {t.auth.registerButton}
          </Button>
        </FormWrapper>

        {/* Ссылка на восстановление пароля */}
        <a className={clsx(styles.subHeading, styles.textCenter)} href="/forgot-password">
          {t.common.forgotPassword}
        </a>

      </div>
    </main>
  )
};