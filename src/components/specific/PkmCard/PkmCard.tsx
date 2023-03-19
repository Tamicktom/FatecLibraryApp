//* Libraries imports
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

//* Style imports
import pkmTypeColors from '@styles/pkmTypeColors';

//* Custom hooks imports
import usePokemon from '@hooks/common/usePokemon';

type Props = {
  name: string;
}

const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export default function PkmCard(props: Props) {
  const router = useRouter();
  const [bgColor, setBgColor] = useState("#FFF");
  //put the first letter of the pokemon name in uppercase
  const [pkmName, setPkmName] = useState(props.name.charAt(0).toUpperCase() + props.name.slice(1));
  const { pokemon, loading, error } = usePokemon(props.name);

  useEffect(() => {
    if (pokemon?.types?.[0]?.type?.name) {
      setBgColor(pkmTypeColors[pokemon?.types?.[0]?.type?.name].light);
    }
  }, [pokemon, loading, error]);

  return (
    <TouchableOpacity
      className='flex flex-col justify-end w-full h-[107px] relative overflow-hidden px-4'
      onPress={() => { router.push(`/pokemon/${props.name}`) }}
    >
      {/* info */}
      <View
        className='flex flex-col justify-between w-full h-20 py-1 pl-36 rounded-2xl'
        style={{
          backgroundColor: bgColor,
        }}
      >
        <View>
          <Text className='text-base text-gray-700'>Nº {pokemon?.id || ""}</Text>
          <Text className='text-2xl font-bold mt-[-4px] text-gray-800'>{pkmName}</Text>
        </View>
        <View className='flex flex-row'>
          {
            pokemon?.types?.map((type, index) => (
              <Text
                key={index}
                className='text-sm rounded-lg px-2 py-1 mr-1 text-white'
                style={{
                  backgroundColor: pkmTypeColors[type.type.name].dark,
                }}
              >
                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
              </Text>
            ))
          }
        </View>
      </View>

      {/* image */}
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
          source={{ uri: pokemon?.sprites?.other['official-artwork'].front_default || "../../../assets/imgs/missigno.png" }}
        />
      </View>
    </TouchableOpacity>
  );
}