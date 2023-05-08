//* Libraries imports
import { useState } from 'react';
import { SafeAreaView } from 'react-native';

//* Components imports
import DeletePokemonDialog from '@components/specific/PkmListCrud/DeletePokemonDialog';
import EditPokemonModal from '@components/specific/PkmListCrud/EditPokemonModal';
import AddPokemonModal from '@components/specific/PkmListCrud/AddPokemonModal';
import PokemonsList from '@components/specific/PkmListCrud/PokemonsList';
import PlusButton from '@components/specific/PkmListCrud/PlusButton';

//* Types imports
import type { Pokemon } from '@localTypes/Firebase';

export default function MyPkmList() {
  const [isListUpdated, setIsListUpdated] = useState(false);
  const [addPokemonModalVisible, setAddPokemonModalVisible] = useState(false);
  const [deletePokemonDialogVisible, setDeletePokemonDialogVisible] = useState(false);
  const [editPokemonModalVisible, setEditPokemonModalVisible] = useState(false);
  const [pokemonToDelete, setPokemonToDelete] = useState<Pokemon | null>(null);
  const [pokemonToEdit, setPokemonToEdit] = useState<Pokemon | null>(null);

  const callDeletePokemonDialog = (pokemon: Pokemon) => {
    setPokemonToDelete(pokemon);
    setDeletePokemonDialogVisible(true);
  }

  const callEditPokemonModal = (pokemon: Pokemon) => {
    setPokemonToEdit(pokemon);
    setEditPokemonModalVisible(true);
  }

  return (
    <SafeAreaView
      className='relative flex flex-col items-center justify-center flex-1 pt-12 bg-neutral-100'
    >

      <PlusButton onPress={() => setAddPokemonModalVisible(true)} />

      <AddPokemonModal
        modalVisible={addPokemonModalVisible}
        setModalVisible={setAddPokemonModalVisible}
        setIsListUpdated={setIsListUpdated}
      />

      <DeletePokemonDialog
        dialogVisible={deletePokemonDialogVisible}
        setDialogVisible={setDeletePokemonDialogVisible}
        pokemonToDelete={pokemonToDelete}
        setIsListUpdated={setIsListUpdated}
      />

      <EditPokemonModal
        modalVisible={editPokemonModalVisible}
        setModalVisible={setEditPokemonModalVisible}
        pokemonToEdit={pokemonToEdit}
        setIsListUpdated={setIsListUpdated}
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