import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import INote from "../../types/note";
import Color from "../../types/color";

import styles from "./Note.module.css";

interface INoteProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  noteData: INote;

  className?: string;
}

const Note = ({ noteData, className, ...props }: INoteProps): JSX.Element => {
  const { id, note, color, favorite } = noteData;

  return (
    <div
      className={cn(styles.root, className, {
        [styles["root-orange"]]: color === Color.orange,
        [styles["root-yellow"]]: color === Color.yellow,
        [styles["root-purple"]]: color === Color.purple,
        [styles["root-blue"]]: color === Color.blue,
        [styles["root-lime"]]: color === Color.lime,
      })}
      {...props}
    >
      <span>{note}</span>
    </div>
  );
};

export default Note;
