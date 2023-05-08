//* Libraries imports
import { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

//* Utils imports
import firebase from '@services/connectionFirebase';

//* Types imports
import type { Pokemon } from "@localTypes/Firebase";

type EditPokemonModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  pokemonToEdit: Pokemon | null;
  setIsListUpdated: (value: boolean) => void;
}

export default function EditPokemonModal(props: EditPokemonModalProps) {
  const router = useRouter();
  const [pokemonToEdit, setPokemonToEdit] = useState<Pokemon>({
    id: '', name: '', type: '', number: 0
  });

  async function editPokemon() {
    if (props.pokemonToEdit) {
      //first, grab the user id
      const userId = firebase.auth().currentUser?.uid;
      if (!userId) return router.push('/'); //if the user is not logged in, redirect to the login page

      //grab all the pokemons from the user
      const personalPokemons = firebase.database()
        .ref('personal-pokemons')
        .child(userId)
        .child('pokemons')
        .orderByChild('id')
        .equalTo(props.pokemonToEdit.id);

      //update the pokemon
      await personalPokemons.once('value', (snapshot) => {
        snapshot.forEach((child) => {
          child.ref.update(pokemonToEdit);
        });
      });

      props.setIsListUpdated(false);
      props.setModalVisible(false);
      alert('Pokémon editado com sucesso!');
    }
  }

  useEffect(() => {
    if (props.modalVisible && props.pokemonToEdit) {
      setPokemonToEdit(props.pokemonToEdit);
    }
  }, [props.modalVisible, props.pokemonToEdit]);

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

        <Text className='mb-4 text-base text-black'>
          Edite um pokémon da sua lista pessoal
        </Text>

        <TextInput
          className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
          placeholder='Nome'
          value={pokemonToEdit.name}
          onChangeText={(text) => setPokemonToEdit({ ...pokemonToEdit, name: text })}
        />

        <TextInput
          className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
          placeholder='Number'
          keyboardType='number-pad'
          value={pokemonToEdit.number.toString()}
          onChangeText={(text) => setPokemonToEdit({ ...pokemonToEdit, number: parseInt(text) })}
        />

        <TextInput
          className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
          placeholder="Type"
          value={pokemonToEdit.type}
          onChangeText={(text) => setPokemonToEdit({ ...pokemonToEdit, type: text })}
        />

        <TouchableOpacity
          className='w-full px-4 py-2 mb-2 bg-green-800 rounded-lg'
          onPress={() => editPokemon()}
        >
          <Text className='text-2xl font-bold text-center text-white'>
            Editar
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