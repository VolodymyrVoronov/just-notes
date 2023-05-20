"use client";

import { NextPage } from "next";
import React, { useState } from "react";

import LogoBig from "../../../components/LogoBig/LogoBig";
import ToggleButtons from "../../../components/ToggleButtons/ToggleButtons";

import styles from "./styles.module.css";

const StartPage: NextPage = (): JSX.Element => {
  const [toggleForm, setToggleForm] = useState(false);

  const getToggleStatus = (flag: boolean) => {
    setToggleForm(flag);
  };

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

        {toggleForm ? "Signin" : "Signup"}
      </div>
    </div>
  );
};

export default StartPage;
