// // app/layout.tsx

// 'use client';  // Mark this file as a Client Component

// import { useEffect, useState } from 'react';
// import './globals.css'; // Import your global styles
// import Sidebar from '@/components/layout/Sidebar';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [queryClient, setQueryClient] = useState<QueryClient | null>(null);

//   // Only create the QueryClient on the client side
//   useEffect(() => {
//     setQueryClient(new QueryClient());
//   }, []);

//   if (!queryClient) return null; // Render nothing until QueryClient is set

//   return (
//     <html lang="en">
//       <body>
//         <QueryClientProvider client={queryClient}>
//           <div className="flex">
//             <Sidebar />
//             <div className="flex-1 p-6">
//               {children}
//             </div>
//           </div>
//         </QueryClientProvider>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
'use client'; // Mark the component as a client-side component if you're using React hooks

import './globals.css'; // Your global styles
import Sidebar from '@/components/layout/Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize QueryClient for React Query
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en"> 
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
              {children} {/* Render child components */}
            </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
