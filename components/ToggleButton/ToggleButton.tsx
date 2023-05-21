import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import cn from "classnames";
import { motion } from "framer-motion";

import styles from "./ToggleButton.module.css";

interface IToggleButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  active: boolean;
  onClick: () => void;
}

const ToggleButton = ({
  text,
  active,
  onClick,
  className,

  ...props
}: IToggleButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={cn(styles.root, className)}
      disabled={active}
      type="button"
      aria-label={text}
      {...props}
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
