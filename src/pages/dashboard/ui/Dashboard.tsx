/**
 * Simple dashboard page
 * 
 * Displays user info and logout functionality
 */

import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/entities/user/model/slice';
import { selectUserEmail, selectIsAuthenticated } from '@/entities/user/model/selectors';
import { Button } from '@/shared/ui/button';
import { useTranslation } from '@/shared/lib/i18n';
import clsx from 'clsx';
import styles from '@/shared/styles/sign.module.scss';

export const Dashboard: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout()); // Clear user state and localStorage
  };

  // Auth guard - redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={clsx(styles.fullMinHeight, styles.authPage, styles.columnDirection)}>
        <h1>Access Denied</h1>
        <p>Please log in to continue</p>
      </div>
    );
  }

  return (
    <main className={clsx(styles.fullMinHeight, styles.authPage, styles.columnDirection)}>
      {/* App header */}
      <div className={clsx(styles.gapping, styles.rowDirection, styles.itemsCenter)}>
        <div className={styles.circle}></div>
        <h2>{t.common.walletApp}</h2>
      </div>

      {/* Main content */}
      <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter)}>
        <div className={styles.headingSection}>
          <h1 className={clsx(styles.heading, styles.textCenter)}>
            Welcome to Dashboard!
          </h1>
          <h2 className={clsx(styles.subHeading, styles.textCenter)}>
            Logged in as: {userEmail}
          </h2>
        </div>

        <div className={styles.columnDirection} style={{ gap: '1rem', marginBottom: '2rem' }}>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Temporary dashboard page
          </p>
          <p style={{ textAlign: 'center', color: '#666' }}>
            Full dashboard will be implemented later
          </p>
        </div>

        <Button variant="sign" size="large" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </main>
  );
};

