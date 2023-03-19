import { createStore } from "zustand";

import type { Pokemon } from "@localTypes/Pokemon";

type PokemonStore = {
  pokemon: null | Pokemon;
};

export const usePokemonStore = createStore<PokemonStore>((set) => ({
  pokemon: null,
}));