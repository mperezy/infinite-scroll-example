import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import chakraTheme from 'chakra-theme';
import IndexPage from 'pages';

export default () => {
  const queryClientRef = useRef<QueryClient>();

  if (queryClientRef.current == null) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 2.5 * 60 * 1000,
          cacheTime: 5 * 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ChakraProvider theme={chakraTheme}>
        <IndexPage />
      </ChakraProvider>
    </QueryClientProvider>
  );
};
