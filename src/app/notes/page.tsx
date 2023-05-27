"use client";

import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

import SideBar from "../../../components/SideBar/SideBar";

import styles from "./styles.module.css";

const NotesPage = () => {
  const session = useSession();

  console.log("session", session);

  const onAddNoteButtonClick = (color: string): void => {
    console.log("color", color);
  };

  const onFavoritesNotesButtonClick = (): void => {
    console.log("onFavoritesNotesButtonClick");
  };

  const onSignOutButtonClick = (): void => {
    signOut();
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      className={styles.root}
    >
      <div className={styles["left-side"]}>
        <SideBar
          onAddNoteButtonClick={onAddNoteButtonClick}
          onFavoritesNotesButtonClick={onFavoritesNotesButtonClick}
          onSignOutButtonClick={onSignOutButtonClick}
        />
      </div>

      <div className={styles["right-side"]}>Right</div>
    </motion.div>
  );
};

export default NotesPage;
