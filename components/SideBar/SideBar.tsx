import { useState } from "react";

import LogoSmall from "../LogoSmall/LogoSmall";
import Button from "../Button/Button";

import styles from "./SideBar.module.css";

const SideBar = (): JSX.Element => {
  const [showNotesIcons, setShowNotesIcons] = useState(false);

  return (
    <div className={styles.root}>
      <LogoSmall />

      <Button
        onMouseEnter={() => setShowNotesIcons(true)}
        onMouseLeave={() => setShowNotesIcons(false)}
        onFocus={() => setShowNotesIcons(true)}
        onBlur={() => setShowNotesIcons(false)}
        className={styles["add-note-button"]}
        hasText={false}
        iconUrl="/icons/plus-01.svg"
        aria-label="Add note"
        iconHeight={40}
        iconWidth={40}
      />
    </div>
  );
};

export default SideBar;
