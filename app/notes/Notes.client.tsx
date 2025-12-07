// app/notes/Notes.client.tsx
'use client';

import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import NotesPage from '@/components/NotesPage/NotesPage';

export interface NotesClientProps {
  initialPage: number;
  initialSearch: string;
}

export default function NotesClient({
  initialPage,
  initialSearch,
}: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 300);

  const router = useRouter();

  // синхронізуємо URL з page/search
  useEffect(() => {
    const params = new URLSearchParams();

    if (page > 1) params.set('page', String(page));
    if (debouncedSearch) params.set('search', debouncedSearch);

    const qs = params.toString();
    router.replace(qs ? `/notes?${qs}` : '/notes');
  }, [page, debouncedSearch, router]);

  const {
    data,
    isLoading,
    error,
    // ✅ у v5 це isPlaceholderData, а не isPreviousData
    isPlaceholderData,
  } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', { page, search: debouncedSearch }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {

    if (!isPlaceholderData) {
      setPage(nextPage);
    }
  };

  if (isLoading && !data) {
    return <p>Loading, please wait...</p>;
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  return (
    <NotesPage
      notes={notes}
      totalPages={totalPages}
      page={page}
      search={search}
      onSearchChange={handleSearchChange}
      onPageChange={handlePageChange}
    />
  );
}
