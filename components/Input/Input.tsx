import React, { DetailedHTMLProps, InputHTMLAttributes, useId } from "react";
import cn from "classnames";

import styles from "./Input.module.css";

interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelText: string;
  className?: string;
}

const Input = ({
  labelText,
  className,

  ...props
}: IInputProps): JSX.Element => {
  const id = useId();

  return (
    <div className={cn(styles.root, className)}>
      <label htmlFor={id} className={styles.label}>
        {labelText}
      </label>
      <input className={styles.input} id={id} {...props} />
    </div>
  );
};

export default Input;
