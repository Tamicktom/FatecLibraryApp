//* Libraries imports
import { useEffect, useState } from "react";

//* Type import
import type { Pokemon } from "@localTypes/Pokemon";

/**
 * sgihsigsdhgjksd dsugdfbgdug
 * @param id
 */

export default function usePokemon(id: number) {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<null | Pokemon>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPokemon(id)
      .then((pokemon) => {
        setPokemon(pokemon);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("Pokemon changed", pokemon);
  }, [pokemon]);

  return { loading, pokemon, error };
}

/**
 * Get Pokémon by id from PokeAPI
 * @param id
 * @returns {Promise<Pokemon>}
 */

async function fetchPokemon(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data as Pokemon;
}
