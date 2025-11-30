
import type { Note } from '@/types/note';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <article>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p>{note.tag}</p>
    </article>
  );
}
