//* Libraries imports
import { Pen, Trash } from 'phosphor-react-native';
import { Text, View, TouchableOpacity } from 'react-native';
import colors from "tailwindcss/colors";

//* Types imports
import type { Pokemon } from "@localTypes/Firebase";

import pkmColors from "@styles/pkmTypeColors"

type PokemonCardProps = {
  pokemon: Pokemon;
  callEditModal: (pokemon: Pokemon) => void;
  callDeleteDialog: (pokemon: Pokemon) => void;
}

export default function PokemonCard(props: PokemonCardProps) {
  return (
    <View
      className='flex flex-row items-center justify-center w-full h-20 mb-2 border-2 rounded-2xl border-neutral-300'
      style={{ backgroundColor: pkmColors[props.pokemon.type]?.light || colors.neutral[100] }}
    >
      <View className='flex items-start justify-start w-4/6 h-full px-2 pt-1'>
        <Text className='text-2xl font-bold text-neutral-700'>
          {props.pokemon.name}
        </Text>
      </View>
      <View className='flex flex-row items-center justify-center w-2/6 h-full'>
        <TouchableOpacity
          className='flex items-center justify-center p-2 border-2 border-red-300 rounded-lg'
          onPress={() => props.callDeleteDialog(props.pokemon)}
        >
          <Trash color={colors.red[300]} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          className='flex items-center justify-center p-2 ml-2 border-2 border-blue-300 rounded-lg'
          onPress={() => props.callEditModal(props.pokemon)}
        >
          <Pen color={colors.blue[300]} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}