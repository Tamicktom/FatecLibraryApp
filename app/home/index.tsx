//* Libraries imports
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { useRouter, Link } from 'expo-router';
import colors from "tailwindcss/colors";

//* Store imports
import { userStore } from "@store/user";

type Props = {}

export default function Home(props: Props) {
  const router = useRouter();

  return (
    <View className='flex items-center justify-start flex-1 p-4 pt-12 bg-neutral-100'>

      <Text className='text-base text-neutral-900'>Esta é a primeira tela do projeto... A Home</Text>

      <TouchableOpacity
        className="flex items-center justify-center w-full p-4 mt-4 bg-blue-800 rounded-2xl"
        onPress={() => {
          userStore.setState({
            user: {
              id: '',
              name: '',
              email: '',
              isLogedIn: false,
            }
          });
        }}
      >
        <Text className='text-2xl text-white uppercase'>Fazer logout</Text>
      </TouchableOpacity>

      <LinkButton title='Elite Four' href='/other/EliteFour' />

    </View>
  )
}

type LinkButtonProps = {
  title: string;
  href: string;
}

function LinkButton({ title, href }: LinkButtonProps) {
  return (

    <TouchableOpacity className='flex items-center justify-center w-full h-12 mt-4 border border-neutral-600 rounded-2xl'>
      <Link href={href}>
        <Text className='text-2xl uppercase text-neutral-800'>{title}</Text>
      </Link>
    </TouchableOpacity>
  );
}