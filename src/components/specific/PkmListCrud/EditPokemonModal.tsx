//* Libraries imports
import { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import colors from "tailwindcss/colors";

//* Components imports
import InputTwo from '@components/common/StyledInput/InputTwo';

//* Utils imports
import firebase from '@services/connectionFirebase';

//* Types imports
import type { Pokemon } from "@localTypes/Firebase";

//* Hooks
import useWindowSize from '@hooks/common/useWindowSize';

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

  const windowSize = useWindowSize();

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
      <View className='relative flex flex-col items-start justify-start w-full h-full p-4 bg-neutral-100'>
        <Text className='mb-2 text-2xl font-bold text-neutral-900'>
          Editar Pokémon
        </Text>

        <Text className='mb-4 text-base text-neutral-700'>
          Edite os dados do seu Pokémon
        </Text>

        <InputTwo
          placeholder='Name'
          value={pokemonToEdit.name}
          onChangeText={(text) => setPokemonToEdit({ ...pokemonToEdit, name: text })}
        />

        <InputTwo
          placeholder='Number'
          keyboardType='number-pad'
          value={pokemonToEdit.number.toString()}
          onChangeText={(text) => setPokemonToEdit({ ...pokemonToEdit, number: parseInt(text) })}
        />

        <InputTwo
          placeholder='Type'
          value={pokemonToEdit.type}
          onChangeText={(text) => setPokemonToEdit({ ...pokemonToEdit, type: text })}
        />

        <View
          className='absolute bottom-0 left-0 flex items-center justify-center p-4'
          style={{
            width: windowSize.width,
          }}
        >
          <TouchableOpacity
            className='w-full px-4 py-4 mb-2 bg-green-800 rounded-lg'
            onPress={() => editPokemon()}
          >
            <Text className='text-2xl font-bold text-center uppercase text-neutral-100'>
              Salvar alterações
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