import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import INote from "../../types/note";

import Note from "../Note/Note";

import styles from "./Notes.module.css";

interface INotesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notes: INote[];

  className?: string;
}

const Notes = ({ notes, className, ...props }: INotesProps): JSX.Element => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      {notes.map((note) => (
        <Note key={note.id} noteData={note} />
      ))}
    </div>
  );
};

export default Notes;
