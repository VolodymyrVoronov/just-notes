import {
  useRef,
  ChangeEvent,
  DetailedHTMLProps,
  HTMLAttributes,
  useState,
  useEffect,
} from "react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import INote from "../../types/note";
import Color from "../../types/color";
import Button from "../Button/Button";

import styles from "./Note.module.css";

interface INoteProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  noteData: INote;

  onSaveNoteButtonClick: (
    id: number | null,
    note: string,
    color: string
  ) => void;
  onEditButtonClick: (id: number | null) => void;
  onDeleteNoteButtonClick: (id: number) => void;
  editedNote: number | null;

  className?: string;
}

const Note = ({
  noteData,
  onSaveNoteButtonClick,
  onEditButtonClick,
  onDeleteNoteButtonClick,
  editedNote,
  className,
  ...props
}: INoteProps): JSX.Element => {
  const { id, note, color, favorite, createdAt } = noteData;

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [editedNoteData, setEditedNoteData] = useState(note);
  const [editedMode, setEditedMode] = useState(false);

  const onEditClick = (): void => {
    console.log("onEditClick");

    setEditedMode(true);
    onEditButtonClick(id);
    setEditedNoteData(note);

    const tId = setTimeout(() => {
      textAreaRef.current?.focus();

      clearTimeout(tId);
    }, 250);
  };

  const onSaveClick = (): void => {
    setEditedMode(false);

    console.log("onSaveClick");

    onSaveNoteButtonClick(id, editedNoteData, color);
    onEditButtonClick(null);
  };

  const onDeleteClick = (): void => {
    setEditedMode(false);
    onDeleteNoteButtonClick(id);
    onEditButtonClick(null);
  };

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedNoteData(e.target.value);
  };

  useEffect(() => {
    if (id === -1) {
      setEditedMode(true);
      onEditButtonClick(id);

      const tId = setTimeout(() => {
        textAreaRef.current?.focus();

        clearTimeout(tId);
      }, 250);
    }
  }, [id, note, noteData, onEditButtonClick]);

  // length 225

  return (
    <div
      className={cn(styles.root, className, {
        [styles["root-orange"]]: color === Color.orange,
        [styles["root-yellow"]]: color === Color.yellow,
        [styles["root-purple"]]: color === Color.purple,
        [styles["root-blue"]]: color === Color.blue,
        [styles["root-lime"]]: color === Color.lime,
        [styles["root-edited-mode"]]:
          editedNote !== id && editedNote !== null && !editedMode,
      })}
      {...props}
    >
      <div className={styles["note-container"]}>
        <AnimatePresence mode="wait">
          {editedMode ? (
            <motion.textarea
              ref={textAreaRef}
              key={String(editedMode)}
              className={styles["note-textarea"]}
              value={editedNoteData}
              onChange={onTextareaChange}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.1,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.1,
                },
              }}
            />
          ) : (
            <motion.span
              key={String(editedMode)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.1,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.1,
                },
              }}
              className={styles.note}
            >
              {note}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className={styles["note-footer"]}>
        {createdAt && (
          <span className={styles["note-created-date"]}>
            {new Date(Date.parse(createdAt)).toDateString().slice(4)}
          </span>
        )}

        <div className={styles["note-buttons"]}>
          <AnimatePresence mode="wait">
            <motion.div
              key={String(favorite)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.5,
                },
              }}
            >
              <Button
                onClick={() => {}}
                className={cn(styles["note-button"])}
                hasText={false}
                iconUrl={
                  favorite
                    ? "/icons/star-yellow-01.svg"
                    : "/icons/star-white-01.svg"
                }
                aria-label={
                  favorite
                    ? "Note marked as favorite"
                    : "Note marked as not favorite"
                }
                iconHeight={15}
                iconWidth={15}
              />
            </motion.div>
          </AnimatePresence>

          <Button
            onClick={onDeleteClick}
            className={cn(styles["note-button"])}
            hasText={false}
            iconUrl="/icons/trash-01.svg"
            aria-label="Delete note"
            iconHeight={15}
            iconWidth={15}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={String(editedMode)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.5,
                },
              }}
            >
              <Button
                onClick={editedMode ? onSaveClick : onEditClick}
                className={cn(
                  styles["note-button"],
                  styles["note-button-edit"]
                )}
                hasText={false}
                iconUrl={
                  editedMode ? "/icons/save-01.svg" : "/icons/edit-01.svg"
                }
                aria-label={editedMode ? "" : "Note marked as not favorite"}
                iconHeight={15}
                iconWidth={15}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Note;
