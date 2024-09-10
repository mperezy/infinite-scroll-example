import type { ReactNode, UIEvent } from 'react';
import { useCallback } from 'react';
import { Stack } from '@chakra-ui/react';

// This means very very close to the bottom of the scroll
const SCROLL_THRESHOLD = 0.1;

type Props<T> = {
  limit: number;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<T>;
} & { children: ReactNode };

export default <T,>({
  children,
  limit,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: Props<T>) => {
  const fetchMoreOnBottomReached = useCallback(
    async (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        const isUnderThreshold =
          scrollHeight - scrollTop - clientHeight < scrollHeight * SCROLL_THRESHOLD;

        if (isUnderThreshold && !isFetchingNextPage && hasNextPage) {
          await fetchNextPage();
        }
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  const onScroll = async (event: UIEvent<HTMLDivElement, globalThis.UIEvent>) =>
    fetchMoreOnBottomReached(event.target as HTMLDivElement);

  return (
    <Stack
      w='100%'
      h={limit > 100 ? '100vh' : `${limit}vh`}
      py='2.15rem'
      alignItems='center'
      overflow='auto'
      onScroll={onScroll}
    >
      {children}
    </Stack>
  );
};
