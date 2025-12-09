'use client';

import { useState, useCallback } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '@/lib/api';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

import css from './NotesPage.module.css';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong.';
    return <ErrorMessage message={message} />;
  }

  return (
    <section className={css.section}>
      <div className={css.topBar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        <button
          type="button"
          className={css.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </section>
  );
}
