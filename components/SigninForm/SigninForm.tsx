"use client";

import { ChangeEvent, useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEventListener } from "ahooks";

import { SignInFormState } from "../../types/form-state";
import Key from "../../types/keys";
import Path from "../../types/paths";

import FormWrapper from "../FormWrapper/FormWrapper";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ButtonShowPassword from "../ButtonShowPassword/ButtonShowPassword";

import styles from "./SigninForm.module.css";

interface ISigninFormProps {
  className?: string;
}

const SigninForm = ({ className }: ISigninFormProps): JSX.Element => {
  const router = useRouter();

  const loginInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<SignInFormState>({
    login: "",
    password: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (errorMessage) setErrorMessage("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSignInButtonClick = async (): Promise<void> => {
    setLoading(true);

    if (errorMessage) setErrorMessage("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: Path.notes,
        login: formData.login,
        password: formData.password,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(Path.notes);
      } else {
        setErrorMessage("Invalid login or password");
      }
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

  useEffect(() => {
    loginInputRef.current?.focus();
  }, []);

  useEventListener("keydown", (e) => {
    if (e.key === Key.Escape) {
      if (errorMessage) setErrorMessage("");
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
        disabled={!formData.login || !formData.password || loading}
        text={loading ? "Loading..." : "Sign in"}
        iconUrl="/icons/circle-arrow-01.svg"
        aria-label="Sign in"
      />
    </FormWrapper>
  );
};

export default SigninForm;
