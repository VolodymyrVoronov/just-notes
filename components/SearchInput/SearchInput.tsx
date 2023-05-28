import Image from "next/image";
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes, Ref } from "react";
import cn from "classnames";

import styles from "./SearchInput.module.css";

interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const SearchInput = forwardRef(
  (
    { className, ...props }: IInputProps,
    ref?: Ref<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.root, className)}>
        <span className={styles.icon}>
          <Image
            src="/icons/search-01.svg"
            width={30}
            height={30}
            alt="Search icon"
          />
        </span>
        <input
          ref={ref}
          className={styles.input}
          placeholder="Search"
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
