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
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";

import styles from "./SignupForm.module.css";

interface ISignupFormProps {
  className?: string;
}

const formDataInitialState: SignUpFormState = {
  login: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = ({ className }: ISignupFormProps): JSX.Element => {
  const router = useRouter();

  const loginInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] =
    useState<SignUpFormState>(formDataInitialState);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (errorMessage) setErrorMessage("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSignupButtonClick = async (): Promise<void> => {
    setLoading(true);

    if (errorMessage) setErrorMessage("");

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
        setErrorMessage(JSON.parse(await res.text()).message);

        return;
      }

      router.push(Path.start);

      setFormData(formDataInitialState);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
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
      if (errorMessage) setErrorMessage("");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setFormData(formDataInitialState);
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
        text={loading ? "Loading..." : "Sign up"}
        iconUrl="/icons/circle-arrow-01.svg"
        aria-label="Sign up"
      />

      <FormErrorMessage
        className={styles["error-message-block"]}
        errorMessage={errorMessage}
      />
    </FormWrapper>
  );
};

export default SignupForm;
