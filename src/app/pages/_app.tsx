// import { AppProps } from 'next/app';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { queryClient as importedQueryClient } from '@/lib/queries';

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const queryClient = new QueryClient();

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <QueryClientProvider client={importedQueryClient}>
//       <Component {...pageProps} />
//     </QueryClientProvider>
//   );
// }

// export default MyApp;

import { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient as importedQueryClient } from '@/lib/queries';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={importedQueryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

