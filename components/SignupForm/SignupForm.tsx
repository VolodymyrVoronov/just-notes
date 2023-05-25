"use client";

import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEventListener } from "ahooks";

import { SignUpFormState } from "../../types/form-state";
import Key from "../../types/keys";
import Path from "../../types/paths";

import FormWrapper from "../FormWrapper/FormWrapper";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ButtonShowPassword from "../ButtonShowPassword/ButtonShowPassword";

import styles from "./SignupForm.module.css";

interface ISignupFormProps {
  className?: string;
}

const SignupForm = ({ className }: ISignupFormProps): JSX.Element => {
  const router = useRouter();

  const loginInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onSignupButtonClick = async (): Promise<void> => {
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      if (!res.ok) {
        console.log("res not ok", res);

        return;
      }

      router.push(Path.start);

      setFormData({
        login: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
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
