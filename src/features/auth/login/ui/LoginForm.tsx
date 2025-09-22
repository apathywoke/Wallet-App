/**
 * Reusable Login Form Component
 * 
 * Production-ready login form with:
 * - Form validation
 * - Error handling
 * - Loading states
 * - Accessibility
 * - Internationalization
 */

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useLoginForm } from '../model/useLoginForm';
import { Button } from '@/shared/ui/button';
import { FormWrapper } from '@/shared/ui/form';
import { InputField } from '@/shared/ui/input';
import { useTranslation } from '@/shared/lib/i18n';
import styles from '@/shared/styles/sign.module.scss';

interface LoginFormProps {
  className?: string;
  showSignUpLink?: boolean;
  onSuccess?: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ 
  className,
  showSignUpLink = true
}) => {
  const { t } = useTranslation();
  const { form, onSubmit, isPending } = useLoginForm();
  const { register, formState: { errors } } = form;

  return (
    <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter, className)}>
      {/* Header Section */}
      <div className={styles.headingSection}>
        <h1 className={clsx(styles.heading, styles.textCenter)}>
          {t.auth.loginTitle}
        </h1>
        <h2 className={clsx(styles.subHeading, styles.textCenter)}>
          {t.common.chooseLoginMethod}
        </h2>
      </div>

      {/* Sign In/Up Toggle */}
      {showSignUpLink && (
        <div className={styles.signButtons}>
          <Button variant="primary" size="small" className={styles.active}>
            {t.common.signIn}
          </Button>
          <Button variant="primary" size="small" className={styles.inactive} as={Link} to="/sign-up">
            {t.common.signUp}
          </Button>
        </div>
      )}

      {/* Form */}
      <FormWrapper onSubmit={onSubmit}>
        <InputField
          placeHolder={t.common.email}
          type="email"
          error={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        
        <InputField
          placeHolder={t.common.password}
          type="password"
          error={!!errors.password}
          errorMessage={errors.password?.message}
          {...register('password')}
        />
        
        <Button 
          variant="sign" 
          size="large" 
          loading={isPending}
          type="submit"
        >
          {t.auth.loginButton}
        </Button>
        
        <a 
          className={clsx(styles.subHeading, styles.textCenter)} 
          href="/forgot-password"
        >
          {t.common.forgotPassword}
        </a>
      </FormWrapper>
    </div>
  );
};
