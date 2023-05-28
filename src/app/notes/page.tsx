"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

import HttpMethod from "../../../types/httpMethod";
import INotes from "../../../types/notes";

import SideBar from "../../../components/SideBar/SideBar";

import styles from "./styles.module.css";

const NotesPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notes, setNotes] = useState<INotes[]>([]);

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

  const onFavoriteNotesButtonClick = (): void => {
    console.log("onFavoriteNotesButtonClick");
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
            const data = dataRes.data as { notes: INotes[] };

            setNotes(data.notes);
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
          onFavoriteNotesButtonClick={onFavoriteNotesButtonClick}
          onSignOutButtonClick={onSignOutButtonClick}
          loading={loading}
        />
      </div>

      <div className={styles["right-side"]}>Right</div>
    </motion.div>
  );
};

export default NotesPage;
