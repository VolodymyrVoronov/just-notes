import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import INote from "../../types/note";

import Note from "../Note/Note";

import styles from "./Notes.module.css";

interface INotesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notes: INote[];

  onSaveNoteButtonClick: (
    id: number | null,
    note: string,
    color: string
  ) => void;
  onDeleteNoteButtonClick: (id: number) => void;

  className?: string;
}

const Notes = ({
  notes,
  onSaveNoteButtonClick,
  onDeleteNoteButtonClick,
  className,
  ...props
}: INotesProps): JSX.Element => {
  const [noteToEditId, setNoteToEditId] = useState<number | null>(null);

  const onEditButtonClick = (id: number | null): void => {
    setNoteToEditId(id);
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      <AnimatePresence>
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ scale: 0.5, opacity: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
          >
            <Note
              noteData={note}
              onSaveNoteButtonClick={onSaveNoteButtonClick}
              onEditButtonClick={onEditButtonClick}
              onDeleteNoteButtonClick={onDeleteNoteButtonClick}
              editedNote={noteToEditId}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notes;
