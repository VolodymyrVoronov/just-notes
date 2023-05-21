import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./FormWrapper.module.css";

interface IFormWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

const FormWrapper = ({
  className,
  children,

  ...props
}: IFormWrapperProps): JSX.Element => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      {children}
    </div>
  );
};

export default FormWrapper;
