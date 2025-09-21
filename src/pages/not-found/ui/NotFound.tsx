/**
 * Компонент страницы 404 (Not Found)
 * 
 * Основные функции:
 * - Отображение ошибки 404 с красивым дизайном
 * - Навигация обратно на главную страницу
 * - Навигация на страницу регистрации
 * - Поддержка многоязычности (i18n)
 * - Адаптивный дизайн для всех устройств
 */

import type { FC } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { Button } from "@/shared/ui/button";
import { useTranslation } from "@/shared/lib/i18n";

import styles from "./NotFound.module.scss";

export const NotFound: FC = () => {
  // Получаем функцию перевода для текущего языка
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        
        {/* Логотип и название приложения */}
        <div className={styles.header}>
          <div className={styles.circle}></div>
          <h2 className={styles.logoText}>{t.common.walletApp}</h2>
        </div>

        {/* Основной контент 404 страницы */}
        <div className={styles.errorContent}>
          {/* Большая цифра 404 */}
          <div className={styles.errorNumber}>404</div>
          
          {/* Текстовое описание ошибки */}
          <div className={styles.textSection}>
            <h1 className={styles.heading}>
              {t.notFound.title}
            </h1>
            <p className={styles.subHeading}>
              {t.notFound.subtitle}
            </p>
          </div>

          {/* Кнопки навигации */}
          <div className={styles.actions}>
            {/* Кнопка возврата на главную */}
            <Button variant="primary" size="large">
              <Link to="/" className={styles.linkButton}>
                {t.notFound.backToHome}
              </Link>
            </Button>
            
            {/* Кнопка создания аккаунта */}
            <Button variant="secondary" size="large">
              <Link to="/sign-up" className={styles.linkButton}>
                {t.notFound.createAccount}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};