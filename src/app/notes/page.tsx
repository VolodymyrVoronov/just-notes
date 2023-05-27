"use client";

import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

import { authOptions } from "../api/auth/[...nextauth]/route";

import styles from "./styles.module.css";

const NotesPage = () => {
  const session = useSession();

  console.log("session", session);

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
      <div className={styles["left-side"]}>Left</div>
      <div className={styles["right-side"]}>Right</div>
    </motion.div>
  );
};

export default NotesPage;
