import {
  DetailedHTMLProps,
  HTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { useClickAway } from "ahooks";

import LogoSmall from "../LogoSmall/LogoSmall";
import Button from "../Button/Button";
import NoteSideBarButtons from "../NoteSideBarButtons/NoteSideBarButtons";

import styles from "./SideBar.module.css";

interface ISideBarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onAddNoteButtonClick: (color: string) => void;
  onFavoriteNotesButtonClick: () => void;
  onSignOutButtonClick: () => void;
  loading: boolean;
  anyFavoriteNotes: boolean;
}

const SideBar = ({
  onAddNoteButtonClick,
  onFavoriteNotesButtonClick,
  onSignOutButtonClick,
  loading,
  anyFavoriteNotes,
  className,

  ...props
}: ISideBarProps): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null);

  const [showNotesIcons, setShowNotesIcons] = useState(false);
  const [showFavoriteNotes, setShowFavoriteNotes] = useState(false);

  const onAddNoteButtonClickHandler = (color: string): void => {
    onAddNoteButtonClick(color);
    setShowNotesIcons(false);
  };

  const onShowFavoriteNotesButtonClick = (): void => {
    onFavoriteNotesButtonClick();
    setShowFavoriteNotes((prev) => !prev);
  };

  useClickAway(() => {
    setShowNotesIcons(false);
  }, ref);

  useEffect(() => {
    setShowFavoriteNotes(false);
  }, [anyFavoriteNotes]);

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
          ref={ref}
          onClick={() => setShowNotesIcons(!showNotesIcons)}
          className={cn(styles["add-note-button"], {
            [styles["add-note-button--active"]]: showNotesIcons,
          })}
          hasText={false}
          iconUrl="/icons/plus-01.svg"
          aria-label="Create and add note button"
          iconHeight={40}
          iconWidth={40}
          disabled={loading}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={String(showFavoriteNotes)}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            }}
            className={styles["note-button-wrapper"]}
          >
            <Button
              onClick={onShowFavoriteNotesButtonClick}
              className={cn(styles["favorite-notes-button"])}
              hasText={false}
              iconUrl={
                showFavoriteNotes
                  ? "/icons/star-yellow-01.svg"
                  : "/icons/star-white-01.svg"
              }
              aria-label={
                anyFavoriteNotes
                  ? "Show favorites notes"
                  : "You do not have any favorites notes yet"
              }
              iconHeight={20}
              iconWidth={20}
              disabled={loading || anyFavoriteNotes}
            />
          </motion.div>
        </AnimatePresence>

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

export default memo(SideBar);
