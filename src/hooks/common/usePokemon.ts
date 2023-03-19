// usePokemon.ts
import { useState, useEffect } from "react";
import type { Pokemon } from "@localTypes/Pokemon";
import useDebouncer from "@hooks/common/useDebouncer";

async function fetchPokemon(name: string): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return data as Pokemon;
}

export default function usePokemon(name: string) {
  const debouncedName = useDebouncer(name, 500);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!debouncedName) {
      setLoading(false);
      setPokemon(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedPokemon = await fetchPokemon(debouncedName);
        setPokemon(fetchedPokemon);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedName]);

  return { loading, pokemon, error };
}
