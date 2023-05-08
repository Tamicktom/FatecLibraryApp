//* Libraries imports
import { Check, X } from 'phosphor-react-native';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import colors from "tailwindcss/colors";

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
      animationType='fade'
      onRequestClose={() => { }}
      transparent={true}
    >
      <View className='flex flex-col items-center justify-center w-full h-full p-4'>
        <View className='flex items-center justify-center w-full p-4 border-2 bg-neutral-100 rounded-2xl border-neutral-400'>
          <Text className='mb-2 text-2xl font-bold text-neutral-900'>
            Deletar um Pokémon
          </Text>
          <Text className='mb-4 text-lg text-neutral-700'>
            Tem certeza que deseja deletar <Text className='font-bold'>{props.pokemonToDelete?.name}</Text>?
          </Text>
          <View className='flex flex-row items-center justify-center w-full'>
            <TouchableOpacity
              className='flex items-center justify-center p-2 border-2 border-green-400 rounded-2xl'
              onPress={() => { deletePokemon() }}
            >
              <Check color={colors.green[400]} size={32} />
            </TouchableOpacity>
            <TouchableOpacity
              className='flex items-center justify-center p-2 ml-4 border-2 border-red-400 rounded-2xl'
              onPress={() => { props.setDialogVisible(false) }}
            >
              <X color={colors.red[400]} size={32} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}