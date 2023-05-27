import cn from "classnames";

import styles from "./LogoSmall.module.css";

interface ILogoSmallProps {
  logoText?: string;
  className?: string;
}

const LogoSmall = ({
  logoText = "JN",
  className,
}: ILogoSmallProps): JSX.Element => {
  return <div className={cn(styles.root, className)}>{logoText}</div>;
};

export default LogoSmall;
