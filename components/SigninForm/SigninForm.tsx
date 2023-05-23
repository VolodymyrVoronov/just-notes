"use client";

import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useEventListener } from "ahooks";

import { SignInFormState } from "../../types/form-state";
import Key from "../../types/keys";

import FormWrapper from "../FormWrapper/FormWrapper";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ButtonShowPassword from "../ButtonShowPassword/ButtonShowPassword";

import styles from "./SigninForm.module.css";

interface ISigninFormProps {
  className?: string;
}

const SigninForm = ({ className }: ISigninFormProps): JSX.Element => {
  const loginInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

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

  const onShowPasswordClick = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    loginInputRef.current?.focus();
  }, []);

  useEventListener("keydown", (e) => {
    if (e.key === Key.Escape) {
      setShowPassword(false);
      setFormData({
        login: "",
        password: "",
      });
    }
  });

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

      <div className={styles["password-field-wrapper"]}>
        <Input
          onChange={onInputChange}
          value={formData.password}
          className={styles["password-field"]}
          labelText="Password"
          type={showPassword ? "text" : "password"}
          name="password"
        />

        <ButtonShowPassword
          showPassword={showPassword}
          password={formData.password}
          onClick={onShowPasswordClick}
        />
      </div>

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
