import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import type { Note } from '@/types/note';

interface NotesPageProps {
  notes: Note[];                   
  totalPages: number;
  page: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
}

export default function NotesPage({
  notes,
  totalPages,
  page,
  search,
  onSearchChange,
  onPageChange,
}: NotesPageProps) {
  return (
    <section className={css.section}>
      <div className={css.topBar}>
        <SearchBox value={search} onChange={onSearchChange} />
        <NoteForm />
      </div>

      <NoteList notes={notes} />

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </section>
  );
}
