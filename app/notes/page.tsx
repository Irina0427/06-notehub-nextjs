
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
  const page = Number(searchParams?.page ?? '1') || 1;
  const search = searchParams?.search ?? '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search, undefined], 
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: search || undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
