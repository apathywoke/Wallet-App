/**
 * Компонент страницы входа в систему
 * 
 * Основные функции:
 * - Отображение формы входа с валидацией
 * - Обработка отправки данных на сервер
 * - Навигация между страницами входа и регистрации
 * - Поддержка многоязычности (i18n)
 * - Toast уведомления об ошибках/успехе
 */

import type { FC } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type LoginFormFillRequiring,
  loginSchema,
} from '@/pages/auth/login/module/dataValidation';
import { LoginRequest } from '@/pages/auth/login/module/loginRequest';

import { Link } from "react-router-dom";
import clsx from "clsx";

import { Button } from "@/shared/ui/button";
import { FormWrapper } from '@/shared/ui/form';
import { InputField } from '@/shared/ui/input';
import { useTranslation } from "@/shared/lib/i18n";

import styles from "@/shared/styles/sign.module.scss";

export const Login: FC = () => {
  // Получаем функцию перевода для текущего языка
  const { t } = useTranslation();
  
  // Хук для выполнения запроса входа (с loading состоянием)
  const { mutateAsync, isPending } = LoginRequest();

  // Настройка формы с валидацией через Zod
  const {
    register,        // Регистрация полей формы
    handleSubmit,    // Обработчик отправки формы
    formState: { errors }, // Ошибки валидации
  } = useForm<LoginFormFillRequiring>({
    resolver: zodResolver(loginSchema), // Схема валидации
    mode: "onChange", // Валидация при изменении полей
  });

  // Обработчик отправки формы - вызывает API запрос
  const onSubmit = async (data: LoginFormFillRequiring) => {
    await mutateAsync(data);
  };

  return (
    <main className={clsx(styles.fullMinHeight, styles.authPage, styles.columnDirection)}>
      {/* Логотип и название приложения */}
      <div className={clsx(styles.gapping, styles.rowDirection, styles.itemsCenter)}>
        <div className={styles.circle}></div>
        <h2>{t.common.walletApp}</h2>
      </div>

      {/* Основная форма входа */}
      <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter)}>
        {/* Заголовок и подзаголовок */}
        <div className={styles.headingSection}>
          <h1 className={clsx(styles.heading, styles.textCenter)}>{t.auth.loginTitle}</h1>
          <h2 className={clsx(styles.subHeading, styles.textCenter)}>{t.common.chooseLoginMethod}</h2>
        </div>

        {/* Переключатель между входом и регистрацией */}
        <div className={styles.signButtons}>
          <Button variant={"primary"} size={"small"} className={styles.active}>
            {t.common.signIn}
          </Button>
          <Button variant={"primary"} size={"small"} className={styles.inactive}>
            <Link to="/sign-up" className={styles.forLink}>{t.common.signUp}</Link>
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
          {/* Кнопка входа с loading состоянием */}
          <Button variant={"sign"} size={"large"} loading={isPending}>
            {t.auth.loginButton}
          </Button>
          {/* Ссылка на восстановление пароля */}
          <a className={clsx(styles.subHeading, styles.textCenter)} href="/forgot-password">
            {t.common.forgotPassword}
          </a>
        </FormWrapper>
      </div>
    </main>
  );
};