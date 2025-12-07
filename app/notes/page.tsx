// app/notes/page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type NotesPageServerProps = {
  searchParams?: {
    page?: string;
    search?: string;
  };
};

export default async function NotesPage({ searchParams }: NotesPageServerProps) {
  const initialPage = Number(searchParams?.page ?? '1') || 1;
  const initialSearch = searchParams?.search ?? '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: initialPage, search: initialSearch }],
    queryFn: () =>
      fetchNotes({
        page: initialPage,
        perPage: 12,
        search: initialSearch || undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={initialPage} initialSearch={initialSearch} />
    </HydrationBoundary>
  );
}
