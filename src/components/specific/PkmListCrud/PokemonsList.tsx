//* Libraries imports
import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

//* Components imports
import PokemonCard from '@components/specific/PkmListCrud/PokemonCard';

//* Utils imports
import firebase from '@services/connectionFirebase';

//* Types imports
import type { Pokemon } from "@localTypes/Firebase";

type PokemonsListProps = {
  isListUpdated: boolean;
  setIsListUpdated: (value: boolean) => void;
  callEditPokemonModal: (pokemon: Pokemon) => void;
  callDeletePokemonDialog: (pokemon: Pokemon) => void;
}

export default function PokemonsList(props: PokemonsListProps) {
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
        return setPokemons(pokemonsListArray as Pokemon[]);
      }
    }

    //if not, set the list to empty and return it
    return setPokemons([]);
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