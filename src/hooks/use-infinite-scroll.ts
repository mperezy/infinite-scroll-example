import type { QueryFunctionContext, QueryKey } from 'react-query';
import { useInfiniteQuery } from 'react-query';

type Props<T> = {
  key: string;
  limit: number;
  fetcher: ({ offset, limit }: PaginateParamsRequest) => Promise<PaginateResponse<T>>;
};

type TotalLoadedItems = { totalLoadedItems?: number };

export default <T>({ key, limit, fetcher }: Props<T>) =>
  useInfiniteQuery<PaginateResponse<T>, Error>(
    [key, limit],
    ({ pageParam }: QueryFunctionContext<QueryKey, TotalLoadedItems>) =>
      fetcher({ offset: pageParam?.totalLoadedItems ?? 0, limit }),
    {
      getNextPageParam: (lastPage, allPages): TotalLoadedItems | undefined => {
        const { count } = lastPage;
        const totalLoadedItems = allPages.flatMap((page) => page.results).length;

        if (totalLoadedItems < count) {
          return { totalLoadedItems };
        }

        return undefined;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );
