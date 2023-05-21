"use client";

import { ChangeEvent, useState, useRef, useEffect } from "react";

import { SignInFormState } from "../../types/form-state";

import FormWrapper from "../FormWrapper/FormWrapper";
import Input from "../Input/Input";

import styles from "./SigninForm.module.css";

interface ISigninFormProps {
  className?: string;
}

const SigninForm = ({ className }: ISigninFormProps): JSX.Element => {
  const LoginInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    LoginInputRef.current?.focus();
  }, []);

  console.log(formData);

  return (
    <FormWrapper className={className}>
      <Input
        ref={LoginInputRef}
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
    </FormWrapper>
  );
};

export default SigninForm;
