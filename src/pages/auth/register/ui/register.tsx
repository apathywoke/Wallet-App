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

export const Register: FC = () => {

  const { mutateAsync, isPending } = RegisterRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFillRequiring>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // validation on changing
  })

  const onSubmit = async (data: RegisterFormFillRequiring)=> {
    await mutateAsync(data); // call RegisterRequest
  }

  return (
    <main className={clsx(styles.fullMinHeight, styles.columnDirection)}>
      <div className={clsx(styles.gapping, styles.rowDirection, styles.itemsCenter)}>
        <div className={styles.circle}></div>
        <h2>Wallet App</h2>
      </div>

      <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter)}>

        <div>
          <h1 className={clsx(styles.heading, styles.textCenter)}>Welcome Back</h1>
          <h2 className={clsx(styles.subHeading, styles.textCenter)}>Choose a login method</h2>
        </div>

        <div className={styles.signButtons}>
          <Button variant={"primary"} size={"small"} className={styles.inactive}>
            <Link to="/sign-in" className={styles.forLink}>Sign In</Link>
          </Button>
          <Button variant={"primary"} size={"small"} className={styles.active}>
            Sign Up
          </Button>
        </div>

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <InputField
            placeHolder={"E-mail"}
            type={"email"}
            {...register ("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <InputField
            placeHolder={"Password"}
            type={"password"}
            {...register ("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <InputField
            placeHolder={"Confirm Password"}
            type={"password"}
            {...register ("confirmPassword")}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
          <Button variant={"sign"} size={"large"} loading={isPending}>Registration</Button>
        </FormWrapper>

        <a className={clsx(styles.subHeading, styles.textCenter)} href={"http://localhost:3000"}>Forgot your password?</a>

      </div>
    </main>
  )
};