import type { FC } from "react";
import clsx from "clsx";

import { Button } from "@/shared/ui/button";
import { FormWrapper} from '@/shared/ui/form';
import { InputField} from '@/shared/ui/input';
import { Link } from "react-router-dom";

import styles from "@/shared/styles/sign.module.scss";

export const Login: FC = () => {
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


        <FormWrapper>
          <div className={styles.signButtons}>
            <Button variant={"primary"} size={"small"} className={styles.active}>Sign In</Button>
            <Button variant={"primary"} size={"small"} className={styles.inactive}>
              <Link to="/sign-up" className={styles.forLink}>Sign Up</Link>
            </Button>
          </div>

          <InputField placeHolder={"E-mail"} type={"email"}></InputField>
          <InputField placeHolder={"Password"} type={"password"}></InputField>
          <Button variant={"sign"} size={"large"}>Log In</Button>
          <a className={clsx(styles.subHeading, styles.textCenter)} href={"http://localhost:3000"}>Forgot your password?</a>
        </FormWrapper>
      </div>
    </main>
  )
};