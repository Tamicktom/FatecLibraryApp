//* Libraries imports
import { useQuery } from "react-query";

//* Type imports
import type { EliteFourMember } from "@localTypes/EliteFour";

type ApiEliteFour = {
  elite_four: EliteFourMember[];
};

async function fetchEliteFour(): Promise<ApiEliteFour> {
  const response = await fetch(`https://live.chunk.run/pokemon-elite-four`);
  const data = await response.json();
  return data as ApiEliteFour;
}

export default function useEliteFour() {
  return useQuery<ApiEliteFour, Error>(["pokemon"], () => fetchEliteFour(), {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
