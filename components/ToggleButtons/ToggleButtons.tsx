"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

import { ToggleButtonType, TToggleButtons } from "../../types/toggle-buttons";
import { FormType, TForm } from "../../types/form-variants";

import ToggleButton from "../ToggleButton/ToggleButton";

import styles from "./ToggleButtons.module.css";

interface IToggleButtonsProps {
  leftButton: string;
  rightButton: string;
  toggleStatusSwitch: (flag: TForm) => void;
  className?: string;
}

const ToggleButtons = ({
  leftButton,
  rightButton,
  toggleStatusSwitch,
  className,
}: IToggleButtonsProps): JSX.Element => {
  const [activeButton, setActiveButton] = useState<TToggleButtons>(
    ToggleButtonType.left
  );

  const onLeftButtonClick = (): void => {
    toggleStatusSwitch(FormType.signin);
    setActiveButton(ToggleButtonType.left);
  };

  const onRightButtonClick = (): void => {
    toggleStatusSwitch(FormType.signup);
    setActiveButton(ToggleButtonType.right);
  };

  return (
    <motion.div
      className={cn(styles.root, className)}
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
        active={activeButton === ToggleButtonType.left}
      />

      <ToggleButton
        text={rightButton}
        onClick={onRightButtonClick}
        active={activeButton === ToggleButtonType.right}
      />
    </motion.div>
  );
};

export default ToggleButtons;
