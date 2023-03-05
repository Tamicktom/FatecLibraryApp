//* Libraries imports
import { View, Text, Image } from 'react-native';
import { usePathname } from 'expo-router';

//* Hook import
import usePokemon from '@hooks/common/usePokemon';

type Props = {}

const Pokemon = (props: Props) => {
  const pokemonId = Number(usePathname().replace('/pokemon/', ''));

  const {pokemon, error, loading} = usePokemon(pokemonId);

  return (
    <View className='flex items-center justify-center flex-1'>
      <Image
        className='w-48 h-48 bg-blue-300 rounded-2xl'
        source={{ uri: pokemon?.sprites?.other?.['official-artwork']?.front_default }}
      />
      <Text className='text-black'>Pokemon: {pokemonId}</Text>
    </View>
  )
}

export default Pokemon;