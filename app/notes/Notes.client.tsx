'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api';
import NotesPage from '@/components/NotesPage/NotesPage';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', { search, page }],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <NotesPage
      notes={data.notes}
      totalPages={data.totalPages}
      page={page}
      search={search}
      onSearchChange={setSearch}
      onPageChange={setPage}
    />
  );
}
