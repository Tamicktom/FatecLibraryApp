//* Libraries imports
import { useState, useEffect } from 'react';
import { Text, SafeAreaView, TextInput, TouchableOpacity, Keyboard, View, Modal, FlatList } from 'react-native';
import firebase from '@services/connectionFirebase';

//* Hook import
import useWindowSize from '@hooks/common/useWindowSize';

type Pokemon = {
  name: string;
  image: string | null;
  type: string;
  number: number;
}

export default function MyPkmList() {
  const [modalVisible, setModalVisible] = useState(true);
  const [pokemonToAdd, setPokemonToAdd] = useState<Pokemon>({
    name: '',
    number: 0,
    type: '',
    image: null,
  });

  const { width, height } = useWindowSize();

  console.log(width, height);

  function clearPokemon() {
    setPokemonToAdd({
      name: '',
      number: 0,
      type: '',
      image: null,
    });
  }

  // async function insertUpdate() {
  //   //editar dados
  //   if (name !== '' && brand !== '' && price !== '' && color !== '' && image !== '' && key !== '') {
  //     firebase.database().ref('pokemons').child(key).update({
  //       name,
  //       brand,
  //       image,
  //       price,
  //       color
  //     });

  //     Keyboard.dismiss();
  //     alert('Produto Editado!');
  //     clearProduct();
  //     setKey('');
  //     return;
  //   }

  //   //cadastrar dados
  //   let produtos = await firebase.database().ref('bikes');
  //   let chave = produtos.push().key;

  //   produtos.child(chave).set({
  //     name,
  //     brand,
  //     image,
  //     price,
  //     color
  //   });

  //   alert('Produto Cadastrado!');
  //   clearProduct();
  //   clearData();
  // }

  async function handleAddPokemon() {
    //verify if the fields are empty
    if (pokemonToAdd.name === '' || pokemonToAdd.number === 0 || pokemonToAdd.type === '') return alert('Preencha todos os campos!');
    //verify if the image is empty
    if (pokemonToAdd.image === null) return alert('Selecione uma imagem!');

  }

  return (
    <SafeAreaView className='flex flex-col items-center justify-center flex-1 px-4 pt-8'>

      <AddPokemonModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <PokemonsList
        pokemons={[{
          name: 'Bulbasaur',
          image: null,
          type: 'Grass',
          number: 1,
        }]}
      />
    </SafeAreaView>
  )
}

type AddPokemonModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

function AddPokemonModal(props: AddPokemonModalProps) {
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
        />

        <TextInput
          className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
          placeholder='Number'
          keyboardType='number-pad'
        />

        <TextInput
          className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
          placeholder="Type"
        />

        <TouchableOpacity
          className='w-full px-4 py-2 mb-2 bg-green-800 rounded-lg'
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

type PokemonsListProps = {
  pokemons: Pokemon[];
}

function PokemonsList(props: PokemonsListProps) {
  return (
    <View className='relative flex flex-col items-center justify-start flex-1 w-full h-full m-0 bg-cyan-900'>
      <FlatList
        className='w-full h-full'
        data={props.pokemons}
        renderItem={(item) => <PokemonCard pokemon={item.item} />}
      />
    </View>
  );
}

type PokemonCardProps = {
  pokemon: Pokemon;
}

function PokemonCard(props: PokemonCardProps) {
  return (
    <View className='flex items-center justify-center w-full h-20 mb-2 bg-red-900'>
      <Text>
        {props.pokemon.name}
      </Text>
    </View>
  );
}