//* Libraries imports
import { Pen, Trash } from 'phosphor-react-native';
import { Text, View,TouchableOpacity } from 'react-native';

//* Types imports
import type { Pokemon } from "@localTypes/Firebase";

type PokemonCardProps = {
  pokemon: Pokemon;
  callEditModal: (pokemon: Pokemon) => void;
  callDeleteDialog: (pokemon: Pokemon) => void;
}

export default function PokemonCard(props: PokemonCardProps) {
  return (
    <View className='flex flex-row items-center justify-center w-full h-20 mb-2'>
      <View className='flex items-start justify-start w-3/4 h-full'>
        <Text className='text-2xl font-bold text-neutral-900'>
          {props.pokemon.name}
        </Text>
      </View>
      <View className='flex flex-row items-center justify-center w-1/4 h-full'>
        <TouchableOpacity
          className='flex items-center justify-center p-2 bg-red-400 rounded-lg'
          onPress={() => props.callDeleteDialog(props.pokemon)}
        >
          <Trash color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className='flex items-center justify-center p-2 ml-2 bg-blue-400 rounded-lg'
          onPress={() => props.callEditModal(props.pokemon)}
        >
          <Pen color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}