//* Libraries imports
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { usePathname, useNavigation } from 'expo-router';
import { ArrowLeft, Heart } from 'phosphor-react-native';

//* Colors
import pkmTypeColors from "@styles/pkmTypeColors";

//* Hook import
import usePokemon from '@hooks/common/usePokemon';

//* Store import
import useFavoritesPokemonsStore from '@store/favoritesPokemons';

type Props = {}

export default function Pokemon(props: Props) {
  const navigation = useNavigation();
  const pokemonId = usePathname().replace('/pokemon/', '');
  const { pokemon, error, loading } = usePokemon(pokemonId);

  const storePokemons = useFavoritesPokemonsStore.getState().pokemons;

  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  //* every time the page loads, verify if the pokemon is already in favorites
  useEffect(() => {
    if (pokemon) {
      const isFavorite = storePokemons.find(p => p.id === pokemon?.id);
      if (isFavorite) {
        setIsFavorited(true);
      }
    }
  }, [pokemon]);

  return (
    <>
      {
        pokemon && (
          <View
            className='flex items-center justify-start flex-1 pt-16'
            style={{ backgroundColor: pkmTypeColors[pokemon?.types[0]?.type?.name]?.color || '#fff' }}
          >
            <View className='flex flex-col w-full'>
              <View className='flex flex-row justify-between w-full px-8'>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <ArrowLeft color="white" size={32} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    //verify if pokemon is already in favorites
                    const isFavorite = useFavoritesPokemonsStore.getState().pokemons.find(p => p.id === pokemon?.id);
                    //if is not in favorites, add it
                    if (!isFavorite) {
                      useFavoritesPokemonsStore.getState().addPokemon(pokemon);
                      setIsFavorited(true);
                    } else {
                      //if is in favorites, remove it
                      useFavoritesPokemonsStore.getState().removePokemon(pokemon);
                      setIsFavorited(false);
                    }
                  }}
                >
                  <Heart
                    color="white"
                    size={32}
                    weight={isFavorited ? 'fill' : 'duotone'}
                  />
                </TouchableOpacity>
              </View>
              <View className='flex flex-row justify-between w-full px-8 mt-8'>
                <Text className='text-4xl font-black text-white'>{pokemon?.name.substring(0, 1).toUpperCase() + pokemon?.name.substring(1)}</Text>
                <Text className='text-2xl font-bold text-white'>#{pokemon?.id}</Text>
              </View>
              <View className='flex flex-row items-start justify-start w-full px-8'>
                {
                  pokemon?.types.map((type, index) => (
                    <PkmTypeCard key={index} type={type.type.name} />
                  ))
                }
              </View>
            </View>

            <View className='z-10'>
              <Image
                className='w-72 h-72 rounded-2xl'
                source={{ uri: pokemon?.sprites?.other?.['official-artwork']?.front_default || "" }}
              />
            </View>

            <View className='w-full h-full bg-white rounded-3xl mt-[-60px]'>

            </View>
          </View>
        )
      }
    </>
  )
}

type PkmTypeCardProps = {
  type: string;
}

function PkmTypeCard(props: PkmTypeCardProps) {
  return (
    <View
      className='flex flex-row items-center justify-center px-4 py-1 mr-2 rounded-2xl'
      style={{
        backgroundColor: 'rgba(255,255,255,0.3)',
      }}
    >
      <Text className='text-base font-bold text-white'>{props.type}</Text>
    </View>
  )
}