'use client';

import css from './NotesPage.module.css';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import type { Note } from '@/types/note';

interface NotesPageProps {
  notes: Note[];
  totalPages: number;
  page: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onOpenModal: () => void;
}

export default function NotesPage({
  notes,
  totalPages,
  page,
  search,
  onSearchChange,
  onPageChange,
  onDelete,
  onOpenModal,
}: NotesPageProps) {
  return (
    <section className={css.section}>
      <div className={css.topBar}>
        <div className={css.search}>
          <SearchBox value={search} onChange={onSearchChange} />
        </div>

        <button
          type="button"
          className={css.createButton}
          onClick={onOpenModal}
        >
          Create note +
        </button>
      </div>

      <NoteList notes={notes} onDelete={onDelete} />

{totalPages > 1 && (
  <Pagination
    totalPages={totalPages}
    page={page}
    onChange={onPageChange}
  />
)}

    </section>
  );
}
