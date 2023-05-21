"use client";

import { NextPage } from "next";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FormType, TForm } from "../../../types/form-variants";

import LogoBig from "../../../components/LogoBig/LogoBig";
import ToggleButtons from "../../../components/ToggleButtons/ToggleButtons";
import SigninForm from "../../../components/SigninForm/SigninForm";

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
          toggleStatusSwitch={getToggleStatus}
          leftButton="Signin"
          rightButton="Signup"
        />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.05,
              duration: 1,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001,
              },
            },
          }}
        >
          <AnimatePresence mode="wait">
            {toggleFormType === FormType.signin ? (
              <motion.div
                key={toggleFormType}
                initial={{
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                }}
              >
                <SigninForm className={styles["signin-form"]} />
              </motion.div>
            ) : (
              <motion.div
                key={toggleFormType}
                initial={{
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                }}
              >
                Signup
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default StartPage;
