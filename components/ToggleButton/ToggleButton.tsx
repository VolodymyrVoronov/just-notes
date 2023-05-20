import React from "react";
import cn from "classnames";
import { motion } from "framer-motion";

import styles from "./ToggleButton.module.css";

interface IToggleButtonProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

const ToggleButton = ({
  text,
  active,
  onClick,
}: IToggleButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={styles.root}
      disabled={active}
      type="button"
      aria-label={text}
    >
      <span
        className={cn({
          [styles.active]: active,
        })}
      >
        {text}
      </span>

      {active && (
        <motion.span className={styles["active-bar"]} layoutId="active-bar" />
      )}
    </button>
  );
};

export default ToggleButton;
