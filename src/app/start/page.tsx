"use client";

import { NextPage } from "next";
import React, { useState } from "react";

import { FormType, TForm } from "../../../types/form";

import LogoBig from "../../../components/LogoBig/LogoBig";
import ToggleButtons from "../../../components/ToggleButtons/ToggleButtons";

import styles from "./styles.module.css";

const StartPage: NextPage = (): JSX.Element => {
  const [toggleFormType, setToggleFormType] = useState<TForm>(FormType.signin);

  const getToggleStatus = (flag: TForm) => {
    setToggleFormType(flag);
  };

  console.log(toggleFormType);

  return (
    <div className={styles.root}>
      <div className={styles["left-side"]}>
        <LogoBig />
      </div>
      <div className={styles["right-side"]}>
        <ToggleButtons
          getToggleStatus={getToggleStatus}
          leftButton="Signin"
          rightButton="Signup"
        />

        {toggleFormType === FormType.signin ? "Signin" : "Signup"}
      </div>
    </div>
  );
};

export default StartPage;
