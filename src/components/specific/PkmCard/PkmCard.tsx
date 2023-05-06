//* Libraries imports
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

//* Style imports
import pkmTypeColors from '@styles/pkmTypeColors';

//* Custom hooks imports
import usePokemon from '@hooks/common/usePokemon';

type Props = {
  name: string;
}

export default function PkmCard(props: Props) {
  const router = useRouter();
  const { pokemon } = usePokemon(props.name);

  return (
    <TouchableOpacity
      className='flex flex-col justify-end w-full h-[107px] relative overflow-hidden px-4'
      onPress={() => { router.push(`/pokemon/${props.name}`) }}
    >
      {/* info */}
      <View
        className='flex flex-col justify-between w-full h-20 py-1 pl-36 rounded-2xl'
        style={{
          backgroundColor: pokemon && pkmTypeColors[pokemon.types[0].type.name].light || "#fff",
        }}
      >
        <View>
          <Text className='text-base text-gray-700'>Nº {pokemon?.id || ""}</Text>
          <Text className='text-2xl font-bold mt-[-4px] text-gray-800'>
            {pokemon?.name?.charAt(0).toUpperCase() + pokemon?.name?.slice(1) || ""}
          </Text>
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