// 'use client';

// import { useNotes, useCurrentUser } from '@/lib/queries';
// import NoteList from '@/components/notes/NoteList';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { LoadingSpinner, LoadingPage } from '@/components/ui/loading';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function DashboardPage() {
//   const router = useRouter();
//   const { data: user, isLoading: userLoading } = useCurrentUser();
//   const { data: notes, isLoading: notesLoading, error } = useNotes();

//   useEffect(() => {
//     if (!user && !userLoading) {
//       router.push('/auth/login');
//     }
//   }, [user, userLoading, router]);

//   if (userLoading || !user) {
//     return <LoadingPage />;
//   }

//   return (
//     <div className="p-4">
//       <Card>
//         <CardHeader>
//           <CardTitle>Your Notes</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {notesLoading ? (
//             <LoadingSpinner />
//           ) : error ? (
//             <p className="text-red-500">Failed to load notes.</p>
//           ) : (
//             <NoteList notes={notes} />
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
'use client';

import { useNotes, useCurrentUser } from '@/lib/queries';
import NoteList from '@/components/notes/NoteList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner, LoadingPage } from '@/components/ui/loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: notes, isLoading: notesLoading, error } = useNotes();

  useEffect(() => {
    if (!user && !userLoading) {
      router.push('/auth/login');
    }
  }, [user, userLoading, router]);

  if (userLoading || !user) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Notes</CardTitle>
        </CardHeader>
        <CardContent>
          {notesLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500">Failed to load notes.</p>
          ) : (
            <NoteList notes={notes || []} />  
          )}
        </CardContent>
      </Card>
    </div>
  );
}
