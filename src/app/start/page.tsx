"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

import { FormType, TForm } from "../../../types/form-variants";
import Path from "../../../types/paths";

import LogoBig from "../../../components/LogoBig/LogoBig";
import ToggleButtons from "../../../components/ToggleButtons/ToggleButtons";
import SigninForm from "../../../components/SigninForm/SigninForm";
import SignupForm from "../../../components/SignupForm/SignupForm";

import styles from "./styles.module.css";

const StartPage: NextPage = (): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();

  const [toggleFormType, setToggleFormType] = useState<TForm>(FormType.signin);

  const getToggleStatus = (flag: TForm) => {
    setToggleFormType(flag);
  };

  useEffect(() => {
    if (session) {
      router.push(Path.notes);
    }
  }, [router, session]);

  return (
    <div className={styles.root}>
      {session === undefined || session ? (
        <motion.div
          initial={{
            opacity: 0,
          }}
          exit={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 1,
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
          className={styles.loading}
        >
          Loading...
        </motion.div>
      ) : (
        <>
          <div className={styles["left-side"]}>
            <LogoBig />
          </div>
          <div className={styles["right-side"]}>
            <ToggleButtons
              toggleStatusSwitch={getToggleStatus}
              leftButton="Sign in"
              rightButton="Sign up"
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
                {toggleFormType === FormType.signin && (
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
                )}

                {toggleFormType === FormType.signup && (
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
                    <SignupForm className={styles["signup-form"]} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default StartPage;
