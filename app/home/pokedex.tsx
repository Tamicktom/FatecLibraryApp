import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView } from 'react-native';
import { FlashList } from "@shopify/flash-list";

import PkmCard from "@components/specific/PkmCard/PkmCard";
import SearchInput from "@components/common/SearchInput/SearchInput";

import { usePokedex, PokemonBasicInfo } from '@hooks/common/usePokedex';

export default function Search() {
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState<PokemonBasicInfo[]>([]);
  const [allPokemons, setAllPokemons] = useState<PokemonBasicInfo[]>([]);
  const { data, loading, error, fetchNextPage, hasNextPage } = usePokedex(1);

  useEffect(() => {
    if (data) {
      const allPagesResults = data.pages.flatMap(page => page.results);
      setAllPokemons(allPagesResults);
    }
  }, [data]);

  useEffect(() => {
    if (query === "") {
      setPokemons(allPokemons);
    } else {
      setPokemons(allPokemons.filter(pkm => pkm.name.includes(query.toLowerCase())));
    }
  }, [query, allPokemons]);

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="inverted" />

      <View className='flex flex-col items-center justify-start flex-1 w-full h-full m-0 bg-white relative'>
        <View className='w-full px-4 absolute top-12 left-0 z-10'>
          <SearchInput
            setQuery={setQuery}
          />
        </View>

        {
          pokemons.length > 0 &&
          <View className='flex flex-col justify-start w-full min-h-full'>
            <FlashList
              data={pokemons}
              renderItem={({ item }) => (
                <PkmCard name={item.name} />
              )}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.3}
              contentContainerStyle={{
                paddingTop: 120,
                paddingBottom: 120,
              }}
              estimatedItemSize={107}
            />
          </View>
        }
      </View>
    </SafeAreaView>
  );
}
