//* Libraries imports
import { useState, useEffect } from 'react';
import { Text, SafeAreaView, TextInput, TouchableOpacity, Keyboard, View, Modal, FlatList } from 'react-native';
import firebase from '@services/connectionFirebase';
import { useRouter } from 'expo-router';
import { Trash, Pen, Check, X } from "phosphor-react-native";

//* Utils imports
import uuid from '@utils/uuid';

type Pokemon = {
  name: string;
  type: string;
  number: number;
}

export default function MyPkmList() {
  const router = useRouter();
  const [isListUpdated, setIsListUpdated] = useState(false);
  const [addPokemonModalVisible, setAddPokemonModalVisible] = useState(true);
  const [deletePokemonDialogVisible, setDeletePokemonDialogVisible] = useState(false);
  const [pokemonToDelete, setPokemonToDelete] = useState<Pokemon | null>(null);
  const [editPokemonModalVisible, setEditPokemonModalVisible] = useState(false);
  const [pokemonToEdit, setPokemonToEdit] = useState<Pokemon | null>(null);

  function callDeletePokemonDialog(pokemon: Pokemon) {
    setPokemonToDelete(pokemon);
    setDeletePokemonDialogVisible(true);
  }

  function callEditPokemonModal(pokemon: Pokemon) {
    setPokemonToEdit(pokemon);
    setEditPokemonModalVisible(true);
  }

  return (
    <SafeAreaView className='flex flex-col items-center justify-center flex-1 px-4 pt-8'>

      <Text>
        Meus Pokémons
      </Text>

      <View>
        <TouchableOpacity
          className='flex items-center justify-center w-full h-20 mb-2 bg-red-900'
          onPress={() => setAddPokemonModalVisible(true)}
        >
          <Text>
            Adicionar um Pokémon
          </Text>
        </TouchableOpacity>
      </View>

      <AddPokemonModal
        modalVisible={addPokemonModalVisible}
        setModalVisible={setAddPokemonModalVisible}
        setIsListUpdated={setIsListUpdated}
      />

      <DeletePokemonDialog
        dialogVisible={deletePokemonDialogVisible}
        setDialogVisible={setDeletePokemonDialogVisible}
        pokemonToDelete={pokemonToDelete}
      />

      <EditPokemonModal
        modalVisible={editPokemonModalVisible}
        setModalVisible={setEditPokemonModalVisible}
        pokemonToEdit={pokemonToEdit}
      />

      <PokemonsList
        isListUpdated={isListUpdated}
        setIsListUpdated={setIsListUpdated}
        callDeletePokemonDialog={callDeletePokemonDialog}
        callEditPokemonModal={callEditPokemonModal}
      />
    </SafeAreaView>
  )
}

type AddPokemonModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setIsListUpdated: (value: boolean) => void;
}

function AddPokemonModal(props: AddPokemonModalProps) {
  const router = useRouter();
  const [pokemonToAdd, setPokemonToAdd] = useState<Pokemon>({
    name: '', type: '', number: 0
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
          name: pokemonToAdd.name,
          number: pokemonToAdd.number,
          type: pokemonToAdd.type
        });
      } else {
        //if the user already has a list, add the pokemon to the end of the array
        await userRef.child('pokemons').push({
          name: pokemonToAdd.name,
          number: pokemonToAdd.number,
          type: pokemonToAdd.type
        });
      }
      Keyboard.dismiss();
      props.setIsListUpdated(false);
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

type DeletePokemonDialogProps = {
  dialogVisible: boolean;
  setDialogVisible: (value: boolean) => void;
  pokemonToDelete: Pokemon | null;
}

function DeletePokemonDialog(props: DeletePokemonDialogProps) {
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

type EditPokemonModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  pokemonToEdit: Pokemon | null;
}

function EditPokemonModal(props: EditPokemonModalProps) {
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

type PokemonsListProps = {
  isListUpdated: boolean;
  setIsListUpdated: (value: boolean) => void;
  callEditPokemonModal: (pokemon: Pokemon) => void;
  callDeletePokemonDialog: (pokemon: Pokemon) => void;
}

function PokemonsList(props: PokemonsListProps) {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  async function getPokemons() {
    //first, grab the user id
    const userId = firebase.auth().currentUser?.uid;
    if (!userId) return router.push('/'); //if the user is not logged in, redirect to the login page

    //verify if the user already has it's own list
    const userRef = firebase.database().ref('personal-pokemons').child(userId);

    //if has, get the pokemons list
    if ((await userRef.once('value')).exists()) {
      const pokemonsList = await userRef.child('pokemons').once('value');
      const pokemonsListValue = pokemonsList.val();
      if (pokemonsListValue) {
        const pokemonsListArray = Object.values(pokemonsListValue);
        console.log(pokemonsListArray);
        setPokemons(pokemonsListArray as Pokemon[]);
      }
    }
  }

  useEffect(() => {
    if (!props.isListUpdated) {
      getPokemons();
      props.setIsListUpdated(true);
    }
  }, [props.isListUpdated]);

  return (
    <View className='relative flex flex-col items-center justify-start flex-1 w-full h-full m-0'>
      <FlatList
        className='w-full h-full'
        data={pokemons}
        renderItem={(item) => (
          <PokemonCard
            callEditModal={props.callEditPokemonModal}
            callDeleteDialog={props.callDeletePokemonDialog}
            pokemon={item.item}
          />
        )}
      />
    </View>
  );
}

type PokemonCardProps = {
  pokemon: Pokemon;
  callEditModal: (pokemon: Pokemon) => void;
  callDeleteDialog: (pokemon: Pokemon) => void;
}

function PokemonCard(props: PokemonCardProps) {
  return (
    <View className='flex flex-row items-center justify-center w-full h-20 mb-2'>
      <View className='flex items-start justify-start w-3/4 h-full'>
        <Text className='text-2xl font-bold text-neutral-900'>
          {props.pokemon.name}
        </Text>
      </View>
      <View className='flex flex-row items-center justify-center w-1/4 h-full'>
        <TouchableOpacity
          className='flex items-center justify-center p-2 bg-red-400 rounded-lg'
          onPress={() => props.callDeleteDialog(props.pokemon)}
        >
          <Trash color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className='flex items-center justify-center p-2 ml-2 bg-blue-400 rounded-lg'
          onPress={() => props.callEditModal(props.pokemon)}
        >
          <Pen color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}