"use client";

import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

import HttpMethod from "../../../types/httpMethod";

import SideBar from "../../../components/SideBar/SideBar";

import styles from "./styles.module.css";

const NotesPage = () => {
  const session = useSession();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log("session", session);

  const onAddNoteButtonClick = (color: string): void => {
    console.log("color", color);
  };

  const onSaveNoteButtonClick = async (note: string, color: string) => {
    setLoading(true);

    if (errorMessage) {
      setErrorMessage("");
    }

    try {
      const res = await fetch("/api/notes/note", {
        method: HttpMethod.POST,
        body: JSON.stringify({
          note,
          color,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      if (!res.ok) {
        const dataRes: unknown = JSON.parse(await res.text());

        if (typeof dataRes === "object" && dataRes && "message" in dataRes) {
          const msg = dataRes.message as string;

          setErrorMessage(msg);
        }

        return;
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const onFavoritesNotesButtonClick = (): void => {
    console.log("onFavoritesNotesButtonClick");
  };

  const onSignOutButtonClick = (): void => {
    signOut();
  };

  useEffect(() => {
    const fetchAllNotes = async (): Promise<void> => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch("/api/notes", {
          method: HttpMethod.GET,

          headers: {
            "Content-Type": "application/json",
          },
        });

        setLoading(false);

        if (!res.ok) {
          const dataRes: unknown = JSON.parse(await res.text());

          if (typeof dataRes === "object" && dataRes && "message" in dataRes) {
            const msg = dataRes.message as string;

            setErrorMessage(msg);
          }
        } else {
          const dataRes: unknown = JSON.parse(await res.text());

          if (typeof dataRes === "object" && dataRes && "data" in dataRes) {
            const data = dataRes.data as { notes: string[] };

            console.log("data", data.notes);
          }
        }
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    };

    fetchAllNotes();
  }, []);

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
          loading={loading}
        />
      </div>

      <div className={styles["right-side"]}>Right</div>
    </motion.div>
  );
};

export default NotesPage;
