//* Libraries imports
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, Text, FlatList } from 'react-native';

//* Components imports
import PkmCard from "@components/specific/PkmCard/PkmCard";
import SearchInput from "@components/common/SearchInput/SearchInput";

//* Hooks imports
import { usePokedex, type PokemonBasicInfo } from '@hooks/common/usePokedex';

export default function Search() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState<PokemonBasicInfo[]>([]);
  const { data, loading, error } = usePokedex(page);

  useEffect(() => {
    //filter by query
    //if query is empty, show all pokemons
    if (data && data.results) {
      if (query === "") {
        setPokemons(data.results);
      } else {
        setPokemons(data.results.filter((pkm) => pkm.name.includes(query.toLowerCase())));
      }
    }
  }, [data]);

  useEffect(() => {
    //if query is empty, show all pokemons
    if (data && data.results) {
      if (query === "") {
        setPokemons(data.results);
      } else {
        setPokemons(data.results.filter((pkm) => pkm.name.includes(query.toLowerCase())));
      }
    }
  }, [query]);

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
          data && data.results && data.results.length > 0 && pokemons.length > 0 &&
          <View className='flex flex-col justify-start w-full'>
            <FlatList
              data={pokemons}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <PkmCard name={item.name} />
              )}
              onEndReached={() => setPage(page + 1)}
              onEndReachedThreshold={0.3}
              contentContainerStyle={{
                paddingTop: 120,
                paddingBottom: 120,
              }}
            />
          </View>
        }
      </View>
    </SafeAreaView>
  );
}