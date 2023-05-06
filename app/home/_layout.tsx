//* Libraries imports
import { useEffect, useState } from 'react';
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { MagnifyingGlass, House, Heart } from "phosphor-react-native";

//* Store import
import { userStore } from "@store/user";

export default function Layout() {
  const router = useRouter();
  const [isLogedIn, setIsLogedIn] = useState(false);

  userStore.subscribe((state) => {
    setIsLogedIn(state.user.isLogedIn);
    console.log(state.user.isLogedIn);
  });

  const options = {
    headerShown: false,
    title: '',
  }

  useEffect(() => {
  }, [isLogedIn]);

  return (
    <SafeAreaProvider className="flex flex-1">
      <Tabs
        initialRouteName="pokedex"
      >
        <Tabs.Screen
          name="pokedex"
          options={{
            ...options,
            tabBarIcon: () => <MagnifyingGlass />,
          }} />
        <Tabs.Screen
          name="index"
          options={{
            ...options,
            tabBarIcon: () => <House />,
          }} />
        <Tabs.Screen
          name="favorites"
          options={{
            ...options,
            tabBarIcon: () => <Heart />,
          }} />
        <Tabs.Screen
          name="options"
          options={{
            ...options,
            tabBarIcon: () => <Heart />,
          }} />
        <Tabs.Screen
          name="GerenciarProdutos"
          options={{
            ...options,
            tabBarIcon: () => <Heart />,
          }} />
      </Tabs>
    </SafeAreaProvider>
  );
}