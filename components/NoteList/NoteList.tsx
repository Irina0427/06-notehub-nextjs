import css from './NoteList.module.css';
import Link from 'next/link';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.card}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>

          <span className={css.tag}>{note.tag}</span>

          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.details}>
              View details
            </Link>

            <button
              className={css.delete}
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
