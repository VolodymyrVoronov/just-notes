"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

import HttpMethod from "../../../types/httpMethod";
import INote from "../../../types/note";

import SideBar from "../../../components/SideBar/SideBar";
import SearchInput from "../../../components/SearchInput/SearchInput";
import Notes from "../../../components/Notes/Notes";

import styles from "./styles.module.css";

const NotesPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notes, setNotes] = useState<INote[]>([]);
  const [searchedNote, setSearchedNote] = useState<string>("");

  const onAddNoteButtonClick = useCallback((color: string): void => {
    console.log("color", color);
  }, []);

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

  const onFavoriteNotesButtonClick = useCallback((): void => {
    console.log("onFavoriteNotesButtonClick");
  }, []);

  const onSignOutButtonClick = useCallback((): void => {
    signOut();
  }, []);

  const onSearchNoteInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchedNote(e.target.value);
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
          return;
        }

        const dataRes: unknown = JSON.parse(await res.text());

        if (typeof dataRes === "object" && dataRes && "data" in dataRes) {
          const data = dataRes.data as { notes: INote[] };

          setNotes(data.notes);
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
          anyFavoriteNotes={!notes.some((note) => note.favorite)}
        />
      </div>

      <div className={styles["right-side"]}>
        <motion.div
          className={styles["search-input"]}
          initial={{
            x: -50,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.5,
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
        >
          <SearchInput
            onChange={onSearchNoteInputChange}
            value={searchedNote}
            disabled={loading}
            aria-label="Search notes"
          />
        </motion.div>

        <motion.span
          className={styles["notes-title"]}
          initial={{
            x: -50,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 1,
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
        >
          Notes
        </motion.span>

        <Notes className={styles["notes-container"]} notes={notes} />
      </div>
    </motion.div>
  );
};

export default NotesPage;
