"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import ToggleButton from "../ToggleButton/ToggleButton";

import styles from "./ToggleButtons.module.css";

interface IToggleButtonsProps {
  leftButton: string;
  rightButton: string;
  getToggleStatus: (flag: boolean) => void;
}

const ToggleButtons = ({
  leftButton,
  rightButton,
  getToggleStatus,
}: IToggleButtonsProps): JSX.Element => {
  const [activeButton, setActiveButton] = useState<"left" | "right">("left");

  const onLeftButtonClick = (): void => {
    getToggleStatus(false);
    setActiveButton("left");
  };

  const onRightButtonClick = (): void => {
    getToggleStatus(true);
    setActiveButton("right");
  };

  return (
    <motion.div
      className={styles.root}
      initial={{
        y: -200,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.05,
          duration: 1,
        },
      }}
    >
      <ToggleButton
        text={leftButton}
        onClick={onLeftButtonClick}
        active={activeButton === "left"}
      />

      <ToggleButton
        text={rightButton}
        onClick={onRightButtonClick}
        active={activeButton === "right"}
      />
    </motion.div>
  );
};

export default ToggleButtons;
