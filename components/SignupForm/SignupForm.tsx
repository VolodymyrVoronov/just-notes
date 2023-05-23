"use client";

import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useEventListener } from "ahooks";

import { SignUpFormState } from "../../types/form-state";
import Key from "../../types/keys";

import FormWrapper from "../FormWrapper/FormWrapper";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ButtonShowPassword from "../ButtonShowPassword/ButtonShowPassword";

import styles from "./SignupForm.module.css";

interface ISignupFormProps {
  className?: string;
}

const SignupForm = ({ className }: ISignupFormProps): JSX.Element => {
  const loginInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<SignUpFormState>({
    login: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSignupButtonClick = (): void => {
    console.log(formData);
  };

  const onShowPasswordClick = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  const onShowConfirmPasswordClick = (): void => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  useEffect(() => {
    loginInputRef.current?.focus();
  }, []);

  useEventListener("keydown", (e) => {
    if (e.key === Key.Escape) {
      setShowPassword(false);
      setShowConfirmPassword(false);
      setFormData({
        login: "",
        password: "",
        confirmPassword: "",
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

      <div className={styles["password-confirm-field-wrapper"]}>
        <Input
          onChange={onInputChange}
          value={formData.confirmPassword}
          className={styles["password-confirm-field"]}
          labelText="Confirm password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
        />

        <ButtonShowPassword
          showPassword={showConfirmPassword}
          password={formData.confirmPassword}
          onClick={onShowConfirmPasswordClick}
        />
      </div>

      <Button
        onClick={onSignupButtonClick}
        className={styles["sign-up-button"]}
        disabled={
          !formData.login || !formData.password || !formData.confirmPassword
        }
        text="Sign&nbsp;up"
        iconUrl="/icons/circle-arrow-01.svg"
        aria-label="Sign up"
      />
    </FormWrapper>
  );
};

export default SignupForm;
