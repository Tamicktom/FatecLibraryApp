//* Libraries imports
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, FlatList } from 'react-native';

import PkmCard from "@components/specific/PkmCard/PkmCard";

//* Store
import PokemonsStore, { type PokemonStore } from '@store/favoritesPokemons';

//* Types
import type { Pokemon } from '@localTypes/Pokemon';


export default function Search() {
  const [favoritesPokemons, setFavoritesPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const unsubscribe = PokemonsStore.subscribe(
      (state: PokemonStore) => {
        setFavoritesPokemons(state.pokemons);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="inverted" />

      <View className='relative flex flex-col items-center justify-start flex-1 w-full h-full m-0 bg-white'>
        {
          favoritesPokemons.length > 0 &&
          <View className='flex flex-col justify-start w-full'>
            <FlatList
              data={favoritesPokemons}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <PkmCard name={item.name} />
              )}
              contentContainerStyle={{
                paddingTop: 40,
                paddingBottom: 120,
              }}
            />
          </View>
        }
      </View>
    </SafeAreaView>
  );
}
