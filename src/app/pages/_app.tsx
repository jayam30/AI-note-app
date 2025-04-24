import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient as importedQueryClient } from '@/lib/queries';


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={importedQueryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
