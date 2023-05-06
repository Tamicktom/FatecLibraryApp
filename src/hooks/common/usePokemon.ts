import { useQuery } from "react-query";
import type { Pokemon } from "@localTypes/Pokemon";
import useDebouncer from "@hooks/common/useDebouncer";

async function fetchPokemon(name: string): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return data as Pokemon;
}

export default function usePokemon(name: string) {
  const debouncedName = useDebouncer(name, 500);

  const { data: pokemon, isLoading: loading, error } = useQuery<Pokemon, Error>(
    ["pokemon", debouncedName],
    () => fetchPokemon(debouncedName),
    {
      enabled: !!debouncedName, // Disables query if debouncedName is empty
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    }
  );

  return { loading, pokemon, error };
}
