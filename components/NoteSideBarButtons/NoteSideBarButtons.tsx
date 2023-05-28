import { DetailedHTMLProps, HTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { INoteButton } from "../../types/note-buttons";
import Color from "../../types/color";

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
    color: Color.orange,
  },
  {
    id: 2,
    color: Color.yellow,
  },
  {
    id: 3,
    color: Color.purple,
  },
  {
    id: 4,
    color: Color.blue,
  },
  {
    id: 5,
    color: Color.lime,
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
                    [styles["note-button-orange"]]: color === Color.orange,
                    [styles["note-button-yellow"]]: color === Color.yellow,
                    [styles["note-button-purple"]]: color === Color.purple,
                    [styles["note-button-blue"]]: color === Color.blue,
                    [styles["note-button-lime"]]: color === Color.lime,
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
