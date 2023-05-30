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
  onFavoriteNoteButtonClick: (id: number, favorite: boolean) => void;
  searchedNotesQuery?: string;

  className?: string;
}

const Notes = ({
  notes,
  onSaveNoteButtonClick,
  onDeleteNoteButtonClick,
  onFavoriteNoteButtonClick,
  searchedNotesQuery,
  className,
  ...props
}: INotesProps): JSX.Element => {
  const [editedNoteId, setEditedNoteId] = useState<number | null>(null);

  const onEditButtonClick = (id: number | null): void => {
    setEditedNoteId(id);
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0 }}
            exit={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <Note
              noteData={note}
              onSaveNoteButtonClick={onSaveNoteButtonClick}
              onEditButtonClick={onEditButtonClick}
              onDeleteNoteButtonClick={onDeleteNoteButtonClick}
              onFavoriteNoteButtonClick={onFavoriteNoteButtonClick}
              editedNoteId={editedNoteId}
              searchedNotesQuery={searchedNotesQuery}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notes;
