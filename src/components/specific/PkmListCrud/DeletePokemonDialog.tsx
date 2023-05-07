//* Libraries imports
import { Check, X } from 'phosphor-react-native';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

//* Tipes imports
import type { Pokemon } from "@localTypes/Firebase";

type DeletePokemonDialogProps = {
  dialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
  pokemonToDelete: Pokemon | null;
}

export default function DeletePokemonDialog(props: DeletePokemonDialogProps) {
  return (
    <Modal
      visible={props.dialogVisible}
      animationType='slide'
      onRequestClose={() => { }}
    >
      <View className='flex flex-col items-start justify-start w-full h-full p-4 bg-blue-900'>
        <Text className='mb-2 text-2xl font-bold'>
          Deletar um Pokémon
        </Text>
        <Text className='mb-4 text-base text-black'>
          Tem certeza que deseja deletar este pokémon?
        </Text>
        <View className='flex flex-row items-center justify-center w-full'>
          <TouchableOpacity
            className='flex items-center justify-center p-2 bg-red-900'
          >
            <Check color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className='flex items-center justify-center p-2 bg-green-900'
            onPress={() => { props.setDialogVisible(false) }}
          >
            <X color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}