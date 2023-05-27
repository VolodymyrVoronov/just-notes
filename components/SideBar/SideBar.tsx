import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

import LogoSmall from "../LogoSmall/LogoSmall";
import Button from "../Button/Button";
import NoteSideBarButtons from "../NoteSideBarButtons/NoteSideBarButtons";

import styles from "./SideBar.module.css";

interface ISideBarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onAddNoteButtonClick: (color: string) => void;
  onFavoritesNotesButtonClick: () => void;
  onSignOutButtonClick: () => void;
}

const SideBar = ({
  onAddNoteButtonClick,
  onFavoritesNotesButtonClick,
  onSignOutButtonClick,
  className,

  ...props
}: ISideBarProps): JSX.Element => {
  const [showNotesIcons, setShowNotesIcons] = useState(false);

  const onAddNoteButtonClickHandler = (color: string): void => {
    onAddNoteButtonClick(color);
    setShowNotesIcons(false);
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      <LogoSmall />

      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <Button
          onClick={() => setShowNotesIcons(!showNotesIcons)}
          className={cn(styles["add-note-button"], {
            [styles["add-note-button--active"]]: showNotesIcons,
          })}
          hasText={false}
          iconUrl="/icons/plus-01.svg"
          aria-label="Create and add note button"
          iconHeight={40}
          iconWidth={40}
        />
      </motion.div>

      <NoteSideBarButtons
        showNotesIcons={showNotesIcons}
        onAddNoteButtonClick={onAddNoteButtonClickHandler}
      />

      <motion.div
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        className={styles["footer-buttons"]}
      >
        <Button
          onClick={onFavoritesNotesButtonClick}
          className={cn(styles["favorite-notes-button"])}
          hasText={false}
          iconUrl="/icons/star-white-01.svg"
          aria-label="Show favorites notes"
          iconHeight={20}
          iconWidth={20}
        />

        <Button
          onClick={onSignOutButtonClick}
          className={cn(styles["sign-out-button"])}
          hasText={false}
          iconUrl="/icons/exit-01.svg"
          aria-label="Sign out"
          iconHeight={20}
          iconWidth={20}
        />
      </motion.div>
    </div>
  );
};

export default SideBar;
