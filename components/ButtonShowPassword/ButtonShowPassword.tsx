import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";

import Button from "../Button/Button";

import styles from "./ButtonShowPassword.module.css";

interface IButtonShowPasswordProps {
  showPassword: boolean;
  password: string;
  onClick: () => void;

  className?: string;
}

const animationButtonVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.25,
    },
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const ButtonShowPassword = ({
  showPassword,
  password,
  onClick,

  className,
}: IButtonShowPasswordProps): JSX.Element => {
  return (
    <AnimatePresence mode="wait">
      {password && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          exit={{
            opacity: 0,
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
            {showPassword ? (
              <motion.div
                className={cn(styles.root, className)}
                key={String(showPassword)}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={animationButtonVariants}
              >
                <Button
                  onClick={onClick}
                  className={styles.button}
                  hasText={false}
                  iconUrl="/icons/eye-close-01.svg"
                  iconWidth={40}
                  iconHeight={40}
                  disabled={!password}
                />
              </motion.div>
            ) : (
              <motion.div
                className={cn(styles.root, className)}
                key={String(showPassword)}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={animationButtonVariants}
              >
                <Button
                  onClick={onClick}
                  className={styles.button}
                  hasText={false}
                  iconUrl="/icons/eye-open-01.svg"
                  iconWidth={40}
                  iconHeight={40}
                  disabled={!password}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ButtonShowPassword;
