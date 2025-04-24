'use client';

import { useNotes } from '@/lib/queries';
import NoteCard from './NoteCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/loading';


export default function NoteList() {
  const { data: notes, isLoading, error } = useNotes();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-medium">Failed to load notes</h3>
        <p className="text-muted-foreground mt-2">Please try again later</p>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center p-12 bg-muted rounded-lg">
        <h3 className="text-xl font-medium">No notes yet</h3>
        <p className="text-muted-foreground mt-2 mb-6">
          Create your first note to get started
        </p>
        <Link href="/notes/new" passHref>
          <Button>Create Note</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Notes</h2>
        <Link href="/notes/new" passHref>
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Note
          </Button>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
// 'use client';

// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// import NoteCard from './NoteCard';

// interface Note {
//   id: string;
//   title: string;
//   content: string;
// }

// interface NoteListProps {
//   notes: Note[]; 
// }

// export default function NoteList({ notes }: NoteListProps) {
//   if (!notes || notes.length === 0) {
//     return (
//       <div className="text-center p-12 bg-muted rounded-lg">
//         <h3 className="text-xl font-medium">No notes yet</h3>
//         <p className="text-muted-foreground mt-2 mb-6">
//           Create your first note to get started
//         </p>
//         <Link href="/notes/new" passHref>
//           <Button>Create Note</Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {notes.map((note) => (
//           <NoteCard key={note.id} note={note} />
//         ))}
//       </div>
//     </div>
//   );
// }
