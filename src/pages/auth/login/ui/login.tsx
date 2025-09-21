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
  const { t } = useTranslation();
  const { mutateAsync, isPending } = LoginRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFillRequiring>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormFillRequiring) => {
    await mutateAsync(data);
  };

  return (
    <main className={clsx(styles.fullMinHeight, styles.columnDirection)}>
      <div className={clsx(styles.gapping, styles.rowDirection, styles.itemsCenter)}>
        <div className={styles.circle}></div>
        <h2>{t.common.walletApp}</h2>
      </div>

      <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter)}>
        <div>
          <h1 className={clsx(styles.heading, styles.textCenter)}>{t.auth.loginTitle}</h1>
          <h2 className={clsx(styles.subHeading, styles.textCenter)}>{t.common.chooseLoginMethod}</h2>
        </div>

        <div className={styles.signButtons}>
          <Button variant={"primary"} size={"small"} className={styles.active}>
            {t.common.signIn}
          </Button>
          <Button variant={"primary"} size={"small"} className={styles.inactive}>
            <Link to="/sign-up" className={styles.forLink}>{t.common.signUp}</Link>
          </Button>
        </div>

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <InputField
            placeHolder={t.common.email}
            type={"email"}
            {...register("email")}
          />
          {errors.email && <span>{t.validation.emailInvalid}</span>}
          <InputField
            placeHolder={t.common.password}
            type={"password"}
            {...register("password")}
          />
          {errors.password && <span>{t.validation.passwordTooShort}</span>}
          <Button variant={"sign"} size={"large"} loading={isPending}>
            {t.auth.loginButton}
          </Button>
          <a className={clsx(styles.subHeading, styles.textCenter)} href="/forgot-password">
            {t.common.forgotPassword}
          </a>
        </FormWrapper>
      </div>
    </main>
  );
};