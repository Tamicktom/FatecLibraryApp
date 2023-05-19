//* Libraries imports
import { useQuery } from "react-query";

//* Type imports
import type { LegendaryPkm } from "@localTypes/LegendaryPokemon";

type ApiLegendaryPkm = {
  Legendary_Pokemons: LegendaryPkm[];
};

async function fetchPokemon(): Promise<ApiLegendaryPkm> {
  const response = await fetch(`https://live.chunk.run/legendaries-pkms`);
  const data = await response.json();
  return data as ApiLegendaryPkm;
}

export default function useLegendaryPkms() {
  return useQuery<ApiLegendaryPkm, Error>(["pokemon"], () => fetchPokemon(), {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
