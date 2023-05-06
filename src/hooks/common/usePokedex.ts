import { useInfiniteQuery } from "react-query";

export interface PokemonBasicInfo {
  name: string;
  url: string;
}

export interface PokedexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasicInfo[];
}

const fetchPokedex = async (page: number): Promise<PokedexResponse> => {
  const limit = 50; // número de pokémons por página
  const offset = (page - 1) * limit;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data as PokedexResponse;
};

export const usePokedex = (page: number) => {
  const {
    data,
    isLoading: loading,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<PokedexResponse, Error>(
    "pokedex",
    ({ pageParam = 1 }) => fetchPokedex(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next) {
          const nextPage = lastPage.next.match(/offset=(\d+)/);
          if (nextPage) {
            const offset = parseInt(nextPage[1], 10);
            return offset / 50 + 1;
          }
        }
        return undefined;
      },
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return { loading, data, error, hasNextPage, fetchNextPage };
};
