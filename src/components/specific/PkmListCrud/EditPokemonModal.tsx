//* Libraries imports
import { Check, X } from 'phosphor-react-native';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

//* Types imports
import type { Pokemon } from "@localTypes/Firebase";

type EditPokemonModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  pokemonToEdit: Pokemon | null;
}

export default function EditPokemonModal(props: EditPokemonModalProps) {
  return (
    <Modal
      visible={props.modalVisible}
      animationType='slide'
      onRequestClose={() => { }}
    >
      <View className='flex flex-col items-start justify-start w-full h-full p-4 bg-blue-900'>
        <Text className='mb-2 text-2xl font-bold'>
          Editar Pokémon
        </Text>
        <View className='flex flex-row items-center justify-center w-full'>
          <TouchableOpacity
            className='flex items-center justify-center p-2 bg-red-900'
          >
            <Check color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className='flex items-center justify-center p-2 bg-green-900'
            onPress={() => { props.setModalVisible(false) }}
          >
            <X color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}