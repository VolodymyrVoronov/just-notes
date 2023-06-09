import { memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import cn from "classnames";

import styles from "./LogoBig.module.css";

interface ILogoBigProps {
  logoText?: string;
  className?: string;
}

const LogoBig = ({
  logoText = "Just Notes",
  className,
}: ILogoBigProps): JSX.Element => {
  return (
    <motion.div
      className={cn(styles.root, className)}
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
      aria-label={logoText}
    >
      {logoText.split(" ").map((word) => (
        <div key={uuidv4()} className={styles.word} aria-label={word}>
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
