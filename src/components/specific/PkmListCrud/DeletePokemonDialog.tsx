//* Libraries imports
import { Check, X } from 'phosphor-react-native';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

//* Utils imports
import firebase from '@services/connectionFirebase';

//* Tipes imports
import type { Pokemon } from "@localTypes/Firebase";

type DeletePokemonDialogProps = {
  dialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
  pokemonToDelete: Pokemon | null;
  setIsListUpdated: (value: boolean) => void;
}

export default function DeletePokemonDialog(props: DeletePokemonDialogProps) {
  const router = useRouter();

  async function deletePokemon() {
    if (props.pokemonToDelete) {
      //first, grab the user id
      const userId = firebase.auth().currentUser?.uid;
      if (!userId) return router.push('/'); //if the user is not logged in, redirect to the login page

      //grab all the pokemons from the user
      const personalPokemons = firebase.database()
        .ref('personal-pokemons')
        .child(userId)
        .child('pokemons')
        .orderByChild('id')
        .equalTo(props.pokemonToDelete.id);

      //delete the pokemon
      await personalPokemons.once('value', (snapshot) => {
        snapshot.forEach((child) => {
          child.ref.remove();
        });
      });

      props.setIsListUpdated(false);
      props.setDialogVisible(false);
      alert('Pokémon deletado com sucesso!');
    }
  }

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
            onPress={() => { deletePokemon() }}
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