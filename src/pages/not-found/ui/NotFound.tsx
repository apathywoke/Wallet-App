import type { FC } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { Button } from "@/shared/ui/button";
import { useTranslation } from "@/shared/lib/i18n";

import styles from "./NotFound.module.scss";

export const NotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <main className={clsx(styles.container, styles.fullMinHeight, styles.columnDirection)}>
      <div className={clsx(styles.content, styles.columnDirection, styles.itemsCenter)}>
        
        {/* Header with logo */}
        <div className={clsx(styles.header, styles.rowDirection, styles.itemsCenter)}>
          <div className={styles.circle}></div>
          <h2 className={styles.logoText}>{t.common.walletApp}</h2>
        </div>

        {/* 404 Content */}
        <div className={clsx(styles.errorContent, styles.columnDirection, styles.itemsCenter)}>
          <div className={styles.errorNumber}>404</div>
          
          <div className={clsx(styles.textSection, styles.columnDirection, styles.itemsCenter)}>
            <h1 className={clsx(styles.heading, styles.textCenter)}>
              {t.notFound.title}
            </h1>
            <p className={clsx(styles.subHeading, styles.textCenter)}>
              {t.notFound.subtitle}
            </p>
          </div>

          {/* Actions */}
          <div className={clsx(styles.actions, styles.columnDirection)}>
            <Button variant="primary" size="large">
              <Link to="/" className={styles.linkButton}>
                {t.notFound.backToHome}
              </Link>
            </Button>
            
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