"use client";

import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

import HttpMethod from "../../../types/http-method";
import INote from "../../../types/note";
import ID from "../../../types/default-id";
import ApiRoute from "../../../types/api-route";

import SideBar from "../../../components/SideBar/SideBar";
import SearchInput from "../../../components/SearchInput/SearchInput";
import Notes from "../../../components/Notes/Notes";

import styles from "./styles.module.css";

const NotesPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notes, setNotes] = useState<INote[]>([]);
  const [searchedNotesQuery, setSearchedNotesQuery] = useState<string>("");
  const [showFavoriteNotes, setShowFavoriteNotes] = useState<boolean>(false);

  const fetchAllNotes = async (): Promise<void> => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(ApiRoute.FETCH_ALL_NOTES, {
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

  const onAddNoteButtonClick = useCallback((color: string): void => {
    setNotes((prevNotes) => [
      {
        id: ID.default,
        note: "",
        color,
        favorite: false,
        createdAt: "",
        updatedAt: "",
        user: {
          id: ID.default,
          name: "",
        },
        userId: ID.default,
      } as INote,
      ...prevNotes,
    ]);
  }, []);

  const onSaveNoteButtonClick = async (
    id: number | null,
    note: string,
    color: string
  ) => {
    setLoading(true);

    if (errorMessage) {
      setErrorMessage("");
    }

    try {
      const res = await fetch(
        id === ID.default ? ApiRoute.CREATE_NOTE : ApiRoute.UPDATE_NOTE,
        id === ID.default
          ? {
              method: HttpMethod.POST,
              body: JSON.stringify({
                note,
                color,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          : {
              method: HttpMethod.PUT,
              body: JSON.stringify({
                id,
                note,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
      );

      setLoading(false);
      setNotes([]);
      fetchAllNotes();

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

  const onDeleteNoteButtonClick = async (id: number): Promise<void> => {
    if (id === ID.default) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

      return;
    }

    try {
      const res = await fetch(ApiRoute.DELETE_NOTE, {
        method: HttpMethod.POST,
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      setNotes([]);
      fetchAllNotes();

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

  const onFavoriteNoteButtonClick = async (
    id: number,
    favorite: boolean
  ): Promise<void> => {
    try {
      const res = await fetch(ApiRoute.ADD_NOTE_TO_FAVORITE, {
        method: HttpMethod.PUT,
        body: JSON.stringify({
          id,
          favorite,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      setNotes([]);
      fetchAllNotes();

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
    setShowFavoriteNotes((prev) => !prev);
  }, []);

  const onSignOutButtonClick = useCallback((): void => {
    signOut();
  }, []);

  const onSearchNoteInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchedNotesQuery(e.target.value);
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  useEffect(() => {
    if (!notes.every((note) => note.favorite)) {
      setShowFavoriteNotes(false);
    }
  }, [notes]);

  const clonedNotes = showFavoriteNotes
    ? structuredClone(notes).filter((note) => note.favorite)
    : structuredClone(notes);

  const filteredNotes = clonedNotes.filter((note) =>
    note.note.toLowerCase().includes(searchedNotesQuery.toLowerCase())
  );

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
            value={searchedNotesQuery}
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

        <AnimatePresence>
          {!notes.length && (
            <motion.span
              key={notes.length}
              className={styles["no-notes"]}
              initial={{
                x: -50,
                opacity: 0,
              }}
              exit={{
                x: -50,
                opacity: 0,
                transition: {
                  duration: 0.5,
                },
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  delay: 2,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              No notes yet...&nbsp;
              <Image
                src="/icons/inbox-01.svg"
                width={18}
                height={18}
                alt="icon"
              />
            </motion.span>
          )}
        </AnimatePresence>

        <Notes
          className={styles["notes-container"]}
          notes={searchedNotesQuery.length > 0 ? filteredNotes : clonedNotes}
          onSaveNoteButtonClick={onSaveNoteButtonClick}
          onDeleteNoteButtonClick={onDeleteNoteButtonClick}
          onFavoriteNoteButtonClick={onFavoriteNoteButtonClick}
          searchedNotesQuery={searchedNotesQuery}
        />
      </div>
    </motion.div>
  );
};

export default NotesPage;
