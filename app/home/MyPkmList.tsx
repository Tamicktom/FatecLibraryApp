//* Libraries imports
import { useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';

//* Components imports
import DeletePokemonDialog from '@components/specific/PkmListCrud/DeletePokemonDialog';
import EditPokemonModal from '@components/specific/PkmListCrud/EditPokemonModal';
import AddPokemonModal from '@components/specific/PkmListCrud/AddPokemonModal';
import PokemonsList from '@components/specific/PkmListCrud/PokemonsList';

//* Utils imports
import firebase from '@services/connectionFirebase';
import uuid from '@utils/uuid';

//* Types imports
import type { Pokemon } from '@localTypes/Firebase';

export default function MyPkmList() {
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