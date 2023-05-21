"use client";

import React from "react";

import FormWrapper from "../FormWrapper/FormWrapper";
import Input from "../Input/Input";

import styles from "./SigninForm.module.css";

interface ISigninFormProps {
  className?: string;
}

const SigninForm = ({ className }: ISigninFormProps): JSX.Element => {
  return (
    <FormWrapper className={className}>
      <Input labelText="Login" type="text" />
      <Input
        className={styles["password-field"]}
        labelText="Password"
        type="password"
      />
    </FormWrapper>
  );
};

export default SigninForm;
