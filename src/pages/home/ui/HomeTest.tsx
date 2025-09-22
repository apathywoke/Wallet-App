/**
 * Главная страница приложения
 * 
 * Представляет продукт и основные возможности
 * Пока в разработке - макет в процессе создания
 */

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from '@/shared/ui/button';
import { useTranslation } from '@/shared/lib/i18n';
import styles from '@/shared/styles/sign.module.scss';

export const HomeTest: FC = () => {
  const { t } = useTranslation();

  return (
    <main className={clsx(styles.fullMinHeight, styles.authPage, styles.columnDirection)}>
      {/* Логотип и название приложения */}
      <div className={clsx(styles.gapping, styles.rowDirection, styles.itemsCenter)}>
        <div className={styles.circle}></div>
        <h2>{t.common.walletApp}</h2>
      </div>

      {/* Основной контент */}
      <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter)}>
        {/* Заголовок */}
        <div className={styles.headingSection}>
          <h1 className={clsx(styles.heading, styles.textCenter)}>
            Добро пожаловать в Wallet App
          </h1>
          <h2 className={clsx(styles.subHeading, styles.textCenter)}>
            Управляйте своими финансами легко и безопасно
          </h2>
        </div>

        {/* Описание продукта */}
        <div className={styles.columnDirection} style={{ gap: '1rem', marginBottom: '2rem' }}>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Современное приложение для управления личными финансами
          </p>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Отслеживайте доходы, расходы и планируйте бюджет
          </p>
        </div>

        {/* Кнопки навигации */}
        <div className={styles.columnDirection} style={{ gap: '1rem', width: '100%' }}>
          <Button variant="sign" size="large" as={Link} to="/sign-in">
            Войти в аккаунт
          </Button>
          <Button variant="primary" size="large" as={Link} to="/sign-up">
            Создать аккаунт
          </Button>
        </div>

        {/* Дополнительная информация */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            Макет главной страницы в разработке
          </p>
        </div>
      </div>
    </main>
  );
};

