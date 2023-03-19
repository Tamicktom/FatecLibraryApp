// usePokedex.ts
import { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PokedexResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedData = await fetchPokedex(page);
        if (data) {
          const newResults = [...data.results, ...fetchedData.results];
          const uniqueResults = newResults.filter(
            (result, index, array) =>
              array.findIndex((r) => r.name === result.name) === index
          );
          setData({ ...fetchedData, results: uniqueResults });
        } else {
          setData(fetchedData);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { loading, data, error };
};
