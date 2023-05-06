//* Libraries imports
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'phosphor-react-native';

//* Style imports
import pkmTypeColors from '@styles/pkmTypeColors';

//* Custom hooks imports
import usePokemon from '@hooks/common/usePokemon';

//* Types imports
import type { PkmType } from '@localTypes/Pokemon';

//* Store imports
import pokemonsStore, { type PokemonStore } from '@store/favoritesPokemons';

type Props = {
  name: string;
}

export default function PkmCard(props: Props) {
  const router = useRouter();
  const { pokemon } = usePokemon(props.name);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  function addFavorite() {
    if (pokemon && !isFavorited) {
      const pkm = pokemonsStore.getState();
      //verify if pokemon is in favorites
      const isAlreadInStore = pkm.pokemons.some(p => p.name === pokemon.name);
      if (isAlreadInStore) return;
      pkm.addPokemon(pokemon);
    }
  }

  function removeFavorite() {
    if (pokemon && isFavorited) {
      const pkm = pokemonsStore.getState();
      //verify if pokemon is in favorites
      const isAlreadInStore = pkm.pokemons.some(p => p.name === pokemon.name);
      if (!isAlreadInStore) return;
      pkm.removePokemon(pokemon);
    }
  }

  useEffect(() => {
    if (pokemon) {
      const unsubscribe = pokemonsStore.subscribe(
        (state: PokemonStore) => {
          const favorite = state.pokemons.some(p => p.name === pokemon.name);
          setIsFavorited(favorite);
        },
      );

      return () => unsubscribe();
    }
  }, [pokemon]);

  return (
    <TouchableOpacity
      className='flex flex-col justify-end w-full h-[107px] relative overflow-hidden px-4'
      onPress={() => { router.push(`/pokemon/${props.name}`) }}
    >
      {/* info */}
      <View className='flex flex-row justify-center w-full h-20 py-1 pl-36 rounded-2xl'
        style={{
          backgroundColor: pokemon && pkmTypeColors[pokemon.types[0].type.name].light || "#fff",
        }}
      >
        <View className='flex flex-col justify-between w-3/4 h-full'>
          <PokemonNameAndNumber name={props.name} number={pokemon?.id || 0} />
          <PokemonTypes type={pokemon?.types.map(t => t.type.name) || []} />
        </View>
        <View className='flex items-start justify-center w-1/4 h-full'>
          {
            pokemon && (
              <TouchableOpacity
                onPress={() => { isFavorited ? removeFavorite() : addFavorite() }}
              >
                <Heart size={32} color='white' weight={isFavorited ? 'fill' : 'duotone'} />
              </TouchableOpacity>
            )
          }
        </View>
      </View>

      {/* image */}
      <PokemonImage url={pokemon?.sprites?.other['official-artwork'].front_default} />
    </TouchableOpacity>
  );
}

function PokemonNameAndNumber({ name, number }: { name: string, number: number }) {
  return (
    <View>
      <Text className='text-base text-gray-700'>Nº {number || ""}</Text>
      <Text className='text-2xl font-bold mt-[-4px] text-gray-800'>
        {name?.charAt(0).toUpperCase() + name?.slice(1) || ""}
      </Text>
    </View>
  )
}

function PokemonTypes({ type }: { type: PkmType[] }) {
  return (
    <View className='flex flex-row'>
      {
        type.map((type, index) => (
          <Text
            key={index}
            className='px-2 py-1 mr-1 text-sm text-white rounded-lg'
            style={{
              backgroundColor: pkmTypeColors[type].dark,
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        ))
      }
    </View>
  );
}

function PokemonImage({ url }: { url: string | undefined | null }) {
  return (
    <View className='absolute top-0 left-4 w-[120px] h-[120px]'>
      <View
        className="absolute bottom-[-38%] left-0 w-[120px] h-[120px] bg-black/20 rounded-full"
        style={{
          transform: [
            { scaleY: 0.2 },
            { scaleX: 0.8 },
          ]
        }}
      />
      <Image
        className='absolute top-0 left-0 w-[120px] h-[120px]'
        source={{ uri: url || "../../../assets/imgs/missigno.png" }}
      />
    </View>
  );
}