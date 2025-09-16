import type { FC } from "react";
import clsx from "clsx";
import styles from "./signUp.module.scss";
import { Button } from "@/shared/ui/button";
import { FormWrapper} from '@/shared/ui/form';
import { InputField} from '@/shared/ui/input';
import { Link } from 'react-router-dom';

export const SignUp: FC = () => {
  return (
    <main className={clsx(styles.fullMinHeight, styles.columnDirection)}>
      <div className={clsx(styles.gapping, styles.rowDirection, styles.itemsCenter)}>
        <div className={styles.circle}></div>
        <h2>Wallet App</h2>
      </div>

      <div className={clsx(styles.formComponent, styles.columnDirection, styles.itemsCenter)}>

        <div>
          <h1 className={styles.heading}>Welcome Back</h1>
          <h2 className={styles.subHeading}>Choose a login method</h2>
        </div>


        <FormWrapper>
          <div className={styles.signButtons}>
            <Button variant={"primary"} size={"small"} style={{background: "none", fontWeight: "500"}}>
              <Link to="/sign-in" className={styles.forLink}>Sign In</Link>
            </Button>
            <Button variant={"primary"} size={"small"} style={{color: "#000000", }}>
              Sign Up
            </Button>
          </div>

          <InputField placeHolder={"E-mail"} type={"email"}></InputField>
          <InputField placeHolder={"Password"} type={"password"}></InputField>
          <InputField placeHolder={"Confirm Password"} type={"password"}></InputField>
          <Button variant={"sign"} size={"large"}>Registration</Button>
          <a className={styles.subHeading} href={"http://localhost:3000"}>Forgot your password?</a>
        </FormWrapper>
      </div>
    </main>
  )
};