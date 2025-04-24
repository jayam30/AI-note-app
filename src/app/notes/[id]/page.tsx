'use client';

import { useParams, useRouter } from 'next/navigation';
import { useNote, useDeleteNote } from '@/lib/queries';
import NoteForm from '@/components/notes/NoteForm';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function NotePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: note, isLoading, error } = useNote(id);

  // const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  useEffect(() => {
    if (error) {
      router.push('/dashboard');
    }
  }, [error, router]);

// make sure you're importing this correctly



// const handleSubmit = async (title: string, content: string) => {
//   await updateNote.mutateAsync({
//     id,
//     note: { title, content },
//   });
// };


  const handleDelete = async () => {
    await deleteNote.mutateAsync(id);
    router.push('/dashboard');
  };

  if (isLoading || !note) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Edit Note</h1>
      <NoteForm initialData={note} />


      <Button variant="destructive" onClick={handleDelete}>
        Delete Note
      </Button>
    </div>
  );
}
