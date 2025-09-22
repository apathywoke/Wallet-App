/**
 * Reusable Register Form Component
 * 
 * Production-ready registration form with:
 * - Form validation
 * - Error handling
 * - Loading states
 * - Accessibility
 * - Internationalization
 */

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useRegisterForm } from '../model/useRegisterForm';
import { Button } from '@/shared/ui/button';
import { FormWrapper } from '@/shared/ui/form';
import { InputField } from '@/shared/ui/input';
import { useTranslation } from '@/shared/lib/i18n';
import styles from '@/shared/styles/sign.module.scss';

interface RegisterFormProps {
  className?: string;
  showSignInLink?: boolean;
  onSuccess?: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ 
  className,
  showSignInLink = true,
  onSuccess 
}) => {
  const { t } = useTranslation();
  const { form, onSubmit, isPending } = useRegisterForm();
  const { register, formState: { errors } } = form;

  return (
    <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter, className)}>
      {/* Header Section */}
      <div className={styles.headingSection}>
        <h1 className={clsx(styles.heading, styles.textCenter)}>
          {t.auth.registerTitle}
        </h1>
        <h2 className={clsx(styles.subHeading, styles.textCenter)}>
          {t.common.chooseLoginMethod}
        </h2>
      </div>

      {/* Sign In/Up Toggle */}
      {showSignInLink && (
        <div className={styles.signButtons}>
          <Button variant="primary" size="small" className={styles.inactive} as={Link} to="/sign-in">
            {t.common.signIn}
          </Button>
          <Button variant="primary" size="small" className={styles.active}>
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
        
        <InputField
          placeHolder={t.common.confirmPassword}
          type="password"
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        
        <Button 
          variant="sign" 
          size="large" 
          loading={isPending}
          type="submit"
        >
          {t.auth.registerButton}
        </Button>
      </FormWrapper>

      {/* Forgot Password Link */}
      <a 
        className={clsx(styles.subHeading, styles.textCenter)} 
        href="/forgot-password"
      >
        {t.common.forgotPassword}
      </a>
    </div>
  );
};
