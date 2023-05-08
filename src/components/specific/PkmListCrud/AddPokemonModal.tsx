//* Libraries imports
import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import firebase from '@services/connectionFirebase';
import colors from "tailwindcss/colors";

//* Components imports
import InputTwo from '@components/common/StyledInput/InputTwo';

//* Utils imports
import uuid from '@utils/uuid';

//* Types imports
import type { Pokemon } from '@localTypes/Firebase';

//* Hooks
import useWindowSize from '@hooks/common/useWindowSize';

type AddPokemonModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setIsListUpdated: (value: boolean) => void;
}

export default function AddPokemonModal(props: AddPokemonModalProps) {
  const router = useRouter();
  const [pokemonToAdd, setPokemonToAdd] = useState<Pokemon>({
    name: '', type: '', number: 0, id: uuid()
  });

  const windowSize = useWindowSize();

  async function addPokemon() {
    //editar dados
    if (pokemonToAdd.name !== '' && pokemonToAdd.number !== 0 && pokemonToAdd.type !== '') {

      //first, grab the user id
      const userId = firebase.auth().currentUser?.uid;
      if (!userId) return router.push('/'); //if the user is not logged in, redirect to the login page

      //verify if the user already has it's own list
      const userRef = firebase.database().ref('personal-pokemons').child(userId);

      //if not, create a new one
      const userRefSnapshot = await userRef.once('value');

      //if the user doesn't have a list, create a new one and add the pokemon to it
      if (!userRefSnapshot.exists()) {
        //crete the "pokemons" list
        const pokemonsList = await userRef.child('pokemons').push();
        //add the pokemon to the list
        await pokemonsList.set({
          id: pokemonToAdd.id,
          name: pokemonToAdd.name,
          number: pokemonToAdd.number,
          type: pokemonToAdd.type
        });
      } else {
        //if the user already has a list, add the pokemon to the end of the array
        await userRef.child('pokemons').push({
          id: pokemonToAdd.id,
          name: pokemonToAdd.name,
          number: pokemonToAdd.number,
          type: pokemonToAdd.type
        });
      }
      Keyboard.dismiss();
      props.setIsListUpdated(false);
      setPokemonToAdd({ name: '', type: '', number: 0, id: uuid() });
      props.setModalVisible(false);
      return alert('Pokémon cadastrado com sucesso!');
    }
  }

  return (
    <Modal
      visible={props.modalVisible}
      animationType='slide'
      onRequestClose={() => { }}
      transparent={true}
    >
      <View
        className='relative flex flex-col items-start justify-start w-full h-full p-4 bg-neutral-100'
      >
        <Text className='mb-2 text-2xl font-bold text-neutral-900'>
          Adicionar um Pokémon
        </Text>

        <Text className='mb-4 text-base text-neutral-700'>
          Adicione um pokémon a sua lista pessoal
        </Text>

        <InputTwo
          placeholder='Name'
          onChangeText={(text) => setPokemonToAdd({ ...pokemonToAdd, name: text })}
        />

        <InputTwo
          placeholder='Number'
          keyboardType='number-pad'
          onChangeText={(text) => setPokemonToAdd({ ...pokemonToAdd, number: parseInt(text) })}
        />

        <InputTwo
          placeholder='Type'
          onChangeText={(text) => setPokemonToAdd({ ...pokemonToAdd, type: text })}
        />

        <View
          className='absolute bottom-0 left-0 flex items-center justify-center p-4'
          style={{
            width: windowSize.width,
          }}
        >
          <TouchableOpacity
            className='w-full px-4 py-4 mb-2 bg-green-800 rounded-lg'
            onPress={() => addPokemon()}
          >
            <Text className='text-2xl font-bold text-center uppercase text-neutral-100'>
              Adicionar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='w-full px-4 py-4 mb-2 border-2 border-red-800 rounded-lg'
            onPress={() => {
              props.setModalVisible(false);
            }}
          >
            <Text className='text-2xl font-bold text-center text-red-800 uppercase'>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}