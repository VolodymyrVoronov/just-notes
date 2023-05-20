import React from "react";
import cn from "classnames";

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
      className={cn(styles.root, {
        [styles.active]: active,
      })}
      disabled={active}
      type="button"
      aria-label={text}
    >
      {text}
    </button>
  );
};

export default ToggleButton;
