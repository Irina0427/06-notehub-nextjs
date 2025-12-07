'use client';

import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { Note } from '@/types/note';
import { useState } from 'react';

export interface NotesPageProps {
  notes: Note[];
  totalPages: number;
  page: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (nextPage: number) => void;
}

export default function NotesPage({
  notes,
  totalPages,
  page,
  search,
  onSearchChange,
  onPageChange,
}: NotesPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section className={css.section}>
      <div className={css.topBar}>
        <SearchBox value={search} onChange={onSearchChange} />

        <button
          type="button"
          className={css.createButton}
          onClick={handleOpenModal}
        >
          Create note +
        </button>
      </div>

      <NoteList notes={notes} />

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </section>
  );
}
