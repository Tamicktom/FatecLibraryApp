import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, FlatList } from 'react-native';

import PkmCard from "@components/specific/PkmCard/PkmCard";

//* Store
import useFavoritesPokemonsStore from '@store/favoritesPokemons';


export default function Search() {
  const favoritesPokemons = useFavoritesPokemonsStore.getState().pokemons;

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
