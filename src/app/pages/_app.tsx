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
