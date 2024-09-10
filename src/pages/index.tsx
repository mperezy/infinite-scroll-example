import { Fragment } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import getPokemons from 'api/services/get-pokemons';
import InfiniteScrollContainer from 'component/infinite-scroll-container';
import useInfiniteScroll from 'hooks/use-infinite-scroll';

const limit = 1000;

export default () => {
  const { data, ...queryState } = useInfiniteScroll({
    key: 'pokemons',
    limit,
    fetcher: getPokemons,
  });

  return (
    <InfiniteScrollContainer {...{ ...queryState, limit }}>
      <Heading size='2xl'>Pokemon list</Heading>
      {data?.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.results.map((pokemon: PokeApiResult) => (
            <Text fontSize='lg' key={pokemon.name}>
              {pokemon.name}
            </Text>
          ))}
        </Fragment>
      ))}
    </InfiniteScrollContainer>
  );
};
