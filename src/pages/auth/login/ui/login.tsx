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
import clsx from "clsx";
import { LoginForm } from '@/features/auth/login';
import { useTranslation } from "@/shared/lib/i18n";
import styles from "@/shared/styles/sign.module.scss";

export const Login: FC = () => {
  const { t } = useTranslation();

  return (
    <main className={clsx(styles.fullMinHeight, styles.authPage, styles.columnDirection)}>
      {/* Логотип и название приложения */}
      <div className={clsx(styles.gapping, styles.rowDirection, styles.itemsCenter)}>
        <div className={styles.circle}></div>
        <h2>{t.common.walletApp}</h2>
      </div>

      {/* Основная форма входа */}
      <LoginForm />
    </main>
  );
};