"use client";

import { ChangeEvent, useState, useRef, useEffect } from "react";

import { SignInFormState } from "../../types/form-state";

import FormWrapper from "../FormWrapper/FormWrapper";
import Input from "../Input/Input";
import Button from "../Button/Button";

import styles from "./SigninForm.module.css";

interface ISigninFormProps {
  className?: string;
}

const SigninForm = ({ className }: ISigninFormProps): JSX.Element => {
  const loginInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<SignInFormState>({
    login: "",
    password: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSignInButtonClick = (): void => {
    console.log(formData);
  };

  useEffect(() => {
    loginInputRef.current?.focus();
  }, []);

  return (
    <FormWrapper className={className}>
      <Input
        ref={loginInputRef}
        onChange={onInputChange}
        value={formData.login}
        labelText="Login"
        type="text"
        name="login"
      />

      <Input
        onChange={onInputChange}
        value={formData.password}
        className={styles["password-field"]}
        labelText="Password"
        type="password"
        name="password"
      />

      <Button
        onClick={onSignInButtonClick}
        className={styles["sign-in-button"]}
        disabled={!formData.login || !formData.password}
        text="Sign&nbsp;in"
        iconUrl="/icons/circle-arrow-01.svg"
        aria-label="Sign in"
      />
    </FormWrapper>
  );
};

export default SigninForm;
