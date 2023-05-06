import { createStore } from "zustand";

import type { Pokemon } from "@localTypes/Pokemon";

type PokemonStore = {
  pokemons: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemon: Pokemon) => void;
};

export const useFavoritesPokemonsStore = createStore<PokemonStore>((set) => ({
  pokemons: [],
  addPokemon: (pokemon) =>
    set((state) => ({
      pokemons: [...state.pokemons, pokemon],
    })),
  removePokemon: (pokemon) =>
    set((state) => ({
      pokemons: state.pokemons.filter((p) => p.id !== pokemon.id),
    })),
}));

export default useFavoritesPokemonsStore;
