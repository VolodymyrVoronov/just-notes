import { DetailedHTMLProps, HTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { INoteButton, ButtonColor } from "../../types/note-buttons";

import styles from "./NoteSideBarButtons.module.css";
import Button from "../Button/Button";

interface INotesSideBarButtonsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  showNotesIcons: boolean;
  onAddNoteButtonClick: (color: string) => void;
}

const noteButtons: INoteButton[] = [
  {
    id: 1,
    color: ButtonColor.orange,
  },
  {
    id: 2,
    color: ButtonColor.yellow,
  },
  {
    id: 3,
    color: ButtonColor.purple,
  },
  {
    id: 4,
    color: ButtonColor.blue,
  },
  {
    id: 5,
    color: ButtonColor.lime,
  },
];

const NotesSideBarButtons = ({
  showNotesIcons,
  onAddNoteButtonClick,
  className,

  ...props
}: INotesSideBarButtonsProps): JSX.Element => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      <AnimatePresence mode="wait">
        {showNotesIcons && (
          <div className={styles["note-buttons"]}>
            {noteButtons.map(({ id, color }) => (
              <motion.div
                key={id}
                initial={{
                  opacity: 0,
                  scale: 0.75,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: 0.05 * id,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.05 * id,
                  },
                }}
                className={styles["note-button-wrapper"]}
              >
                <Button
                  onClick={() => onAddNoteButtonClick(color)}
                  className={cn(styles["note-button"], {
                    [styles["note-button-orange"]]:
                      color === ButtonColor.orange,
                    [styles["note-button-yellow"]]:
                      color === ButtonColor.yellow,
                    [styles["note-button-purple"]]:
                      color === ButtonColor.purple,
                    [styles["note-button-blue"]]: color === ButtonColor.blue,
                    [styles["note-button-lime"]]: color === ButtonColor.lime,
                  })}
                  hasText={false}
                  hasIcon={false}
                  aria-label={`Notes with color ${color}`}
                  iconHeight={40}
                  iconWidth={40}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesSideBarButtons;
