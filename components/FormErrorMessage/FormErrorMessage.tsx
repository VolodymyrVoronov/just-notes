import { DetailedHTMLProps, HTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import styles from "./FormErrorMessage.module.css";

interface IFormErrorMessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  errorMessage?: string;
  className?: string;
}

const FormErrorMessage = ({
  errorMessage = "Something went wrong",
  className,

  ...props
}: IFormErrorMessageProps): JSX.Element => {
  return (
    <AnimatePresence mode="wait">
      {errorMessage && (
        <div className={cn(styles.root, className)} {...props}>
          <motion.div
            key={errorMessage}
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
            <p className={styles.message}>{errorMessage}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FormErrorMessage;
