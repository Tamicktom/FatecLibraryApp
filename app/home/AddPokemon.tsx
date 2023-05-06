//* Libraries imports
import { useState, useEffect } from 'react';
import { Text, SafeAreaView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import firebase from '@services/connectionFirebase';

type Pokemon = {
  name: string;
  image: string | null;
  type: string;
  number: number;
}

export default function AddPokemon() {
  const [pokemonToAdd, setPokemonToAdd] = useState<Pokemon>({
    name: '',
    number: 0,
    type: '',
    image: null,
  });

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
    <SafeAreaView className='flex flex-col items-center justify-center flex-1 px-4'>
      <Text className='mb-2 text-2xl font-bold'>
        Adicionar um Pokémon
      </Text>

      <Text className='mb-4 text-base text-black'>
        Adicione um pokémon a sua lista...
      </Text>

      <TextInput
        className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
        placeholder='Nome'
        value={pokemonToAdd.name}
        onChangeText={(text) => setPokemonToAdd({ ...pokemonToAdd, name: text })}
      />

      <TextInput
        className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
        placeholder='Number'
        value={pokemonToAdd.number + ""}
        keyboardType='number-pad'
        onChangeText={(text) => setPokemonToAdd({ ...pokemonToAdd, number: Number(text) })}
      />

      <TextInput
        className='w-full px-4 py-2 mb-2 text-xl rounded-lg bg-slate-200'
        placeholder="Type"
        value={pokemonToAdd.type}
        onChangeText={(text) => setPokemonToAdd({ ...pokemonToAdd, type: text })}
      />

      <TouchableOpacity
        className='w-full px-4 py-2 mb-2 bg-green-800 rounded-lg'
        onPress={handleAddPokemon}
      >
        <Text className='text-2xl font-bold text-center text-white'>
          Adicionar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}