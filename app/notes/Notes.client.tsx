'use client';

import { useState } from 'react';
import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { fetchNotes, deleteNote } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';
import type { Note } from '@/types/note';

import NotesPage from '@/components/NotesPage/NotesPage';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '../loading';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

const PER_PAGE = 12;

interface NotesClientProps {
  initialPage: number;
  initialSearch: string;
}

export default function NotesClient({
  initialPage,
  initialSearch,
}: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    const message = (error as Error)?.message ?? 'Unknown error';
    return <ErrorMessage message={message} />;
  }

  return (
    <>
      <NotesPage
        notes={notes}
        totalPages={totalPages}
        page={page}
        search={search}
        onSearchChange={setSearch}
        onPageChange={setPage}
        onDelete={handleDelete}
        onOpenModal={handleOpenModal}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <NoteForm onClose={handleCloseModal} />
      </Modal>
    </>
  );
}
