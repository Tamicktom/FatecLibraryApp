//* Libraries imports
import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import firebase from '@services/connectionFirebase';

//* Utils imports
import uuid from '@utils/uuid';

//* Types imports
import type { Pokemon } from '@localTypes/Firebase';

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
    >
      <View className='flex flex-col items-start justify-start w-full h-full p-4 bg-blue-900'>
        <Text className='mb-2 text-2xl font-bold'>
          Adicionar um Pokémon
        </Text>

        <Text className='mb-4 text-base text-black'>
          Adicione um pokémon a sua lista pessoal
        </Text>

        <TextInput
          className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
          placeholder='Nome'
          onChangeText={(text) => setPokemonToAdd({ ...pokemonToAdd, name: text })}
        />

        <TextInput
          className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
          placeholder='Number'
          keyboardType='number-pad'
          onChangeText={(text) => setPokemonToAdd({ ...pokemonToAdd, number: parseInt(text) })}
        />

        <TextInput
          className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
          placeholder="Type"
          onChangeText={(text) => setPokemonToAdd({ ...pokemonToAdd, type: text })}
        />

        <TouchableOpacity
          className='w-full px-4 py-2 mb-2 bg-green-800 rounded-lg'
          onPress={() => addPokemon()}
        >
          <Text className='text-2xl font-bold text-center text-white'>
            Adicionar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='w-full px-4 py-2 mb-2 bg-green-800 rounded-lg'
          onPress={() => {
            props.setModalVisible(false);
          }}
        >
          <Text className='text-2xl font-bold text-center text-white'>
            Fechar
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}