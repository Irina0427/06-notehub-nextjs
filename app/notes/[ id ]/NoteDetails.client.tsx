
'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { NoteDetails } from '@/components/NoteDetails/NoteDetails';

export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(String(id)),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return <NoteDetails note={note} />;
}
