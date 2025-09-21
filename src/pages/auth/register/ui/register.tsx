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
  const { t } = useTranslation();
  const { mutateAsync, isPending } = RegisterRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFillRequiring>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  })

  const onSubmit = async (data: RegisterFormFillRequiring)=> {
    await mutateAsync(data);
  }

  return (
    <main className={clsx(styles.fullMinHeight, styles.columnDirection)}>
      <div className={clsx(styles.gapping, styles.rowDirection, styles.itemsCenter)}>
        <div className={styles.circle}></div>
        <h2>{t.common.walletApp}</h2>
      </div>

      <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter)}>

        <div>
          <h1 className={clsx(styles.heading, styles.textCenter)}>{t.auth.registerTitle}</h1>
          <h2 className={clsx(styles.subHeading, styles.textCenter)}>{t.common.chooseLoginMethod}</h2>
        </div>

        <div className={styles.signButtons}>
          <Button variant={"primary"} size={"small"} className={styles.inactive}>
            <Link to="/sign-in" className={styles.forLink}>{t.common.signIn}</Link>
          </Button>
          <Button variant={"primary"} size={"small"} className={styles.active}>
            {t.common.signUp}
          </Button>
        </div>

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <InputField
            placeHolder={t.common.email}
            type={"email"}
            {...register ("email")}
          />
          {errors.email && <span>{t.validation.emailInvalid}</span>}
          <InputField
            placeHolder={t.common.password}
            type={"password"}
            {...register ("password")}
          />
          {errors.password && <span>{t.validation.passwordTooShort}</span>}
          <InputField
            placeHolder={t.common.confirmPassword}
            type={"password"}
            {...register ("confirmPassword")}
          />
          {errors.confirmPassword && <span>{t.validation.passwordsNotMatch}</span>}
          <Button variant={"sign"} size={"large"} loading={isPending}>
            {t.auth.registerButton}
          </Button>
        </FormWrapper>

        <a className={clsx(styles.subHeading, styles.textCenter)} href="/forgot-password">
          {t.common.forgotPassword}
        </a>

      </div>
    </main>
  )
};