"use client";

import React, { memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

import styles from "./LogoBig.module.css";

interface ILogoBigProps {
  logoText?: string;
}

const LogoBig = ({ logoText = "Just Notes" }: ILogoBigProps): JSX.Element => {
  return (
    <motion.div
      className={styles.root}
      initial={{
        x: -200,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          delay: 0.05,
          duration: 1,
        },
      }}
    >
      {logoText.split(" ").map((word) => (
        <div key={uuidv4()} className={styles.word}>
          {word.split("").map((letter) => (
            <span key={uuidv4()} className={styles.letter}>
              {letter}
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default memo(LogoBig);
