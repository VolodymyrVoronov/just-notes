import { NextPage } from "next";
import React from "react";

import LogoBig from "../../../components/LogoBig/LogoBig";

import styles from "./styles.module.css";

const StartPage: NextPage = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles["left-side"]}>
        <LogoBig />
      </div>
      <div className={styles["right-side"]}>Right</div>
    </div>
  );
};

export default StartPage;
