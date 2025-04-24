// import { useCreateNote } from '@/lib/queries';
// import { useRouter } from 'next/navigation';



// export default function NewNotePage() {
//   const router = useRouter();
  
//   // Get the createNote mutation
//   const { mutateAsync: createNote } = useCreateNote();

//   const handleSubmit = async (title: string, content: string) => {
//     const note = await createNote({ title, content });
//     if (note) {
//       router.push(`/notes/${note.id}`);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold mb-4">Create New Note</h1>
//       <NoteForm onSubmit={handleSubmit} />
//     </div>
//   );
// }


'use client';

import NoteForm from '@/components/notes/NoteForm';

export default function NewNotePage() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create New Note</h1>
      <NoteForm />
    </div>
  );
}

