import Image from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Button.module.css";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  hasText?: boolean;
  text?: string;
  hasIcon?: boolean;
  iconUrl?: string;
  iconWidth?: number;
  iconHeight?: number;
}

const Button = ({
  hasText = true,
  text,
  hasIcon = true,
  iconUrl = "",
  iconWidth = 45,
  iconHeight = 45,
  className,

  ...props
}: IButtonProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={cn(styles.root, className, {
        [styles["root-text-only"]]: !hasIcon,
        [styles["root-icon-only"]]: !hasText,
      })}
      onMouseEnter={hasIcon && hasText ? () => setIsHovered(true) : undefined}
      onMouseLeave={hasIcon && hasText ? () => setIsHovered(false) : undefined}
      onFocus={hasIcon && hasText ? () => setIsHovered(true) : undefined}
      onBlur={hasIcon && hasText ? () => setIsHovered(false) : undefined}
      type="button"
      {...props}
    >
      {hasText && hasIcon && (
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.span
              key={String(isHovered)}
              className={styles.text}
              initial={{ opacity: 0, translateX: 100, filter: "blur(10px)" }}
              exit={{
                opacity: 0,
                translateX: 0,
                filter: "blur(5px)",
                transition: {
                  duration: 0.5,
                },
              }}
              animate={{
                opacity: 1,
                translateX: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.5,
                },
              }}
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      )}

      {hasIcon ? (
        <Image src={iconUrl} width={iconWidth} height={iconHeight} alt="icon" />
      ) : (
        <span className={cn(styles.text, styles["text-only"])}>{text}</span>
      )}
    </button>
  );
};

export default Button;
