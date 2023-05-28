import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import INotes from "../../types/notes";

import styles from "./Notes.module.css";

interface INotesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  notes: INotes[];

  className?: string;
}

const Notes = ({ notes, className, ...props }: INotesProps): JSX.Element => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      {notes.map(({ id, note, color }) => (
        <div key={id}>{note}</div>
      ))}
    </div>
  );
};

export default Notes;
