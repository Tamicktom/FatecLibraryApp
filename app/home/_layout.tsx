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
            tabBarIcon: ({ focused }) => renderIcon(focused, "pokedex")
          }} />
        <Tabs.Screen
          name="index"
          options={{
            ...options,
            tabBarIcon: ({ focused }) => renderIcon(focused, "index")
          }} />
        {/* <Tabs.Screen
          name="favorites"
          options={{
            ...options,
            tabBarIcon: () => <Heart />,
          }} /> */}
        <Tabs.Screen
          name="options"
          options={{
            ...options,
            tabBarIcon: ({ focused }) => renderIcon(focused, "options"),
          }} />
        {/* <Tabs.Screen
          name="GerenciarProdutos"
          options={{
            ...options,
            tabBarIcon: () => <Heart />,
          }} /> */}
      </Tabs>
    </SafeAreaProvider>
  );
}

type Routes = "pokedex" | "index" | "favorites" | "options" | "GerenciarProdutos";

function renderIcon(focused: boolean, route: Routes) {
  switch (route) {
    case "pokedex":
      return <MagnifyingGlass color={focused ? "black" : "gray"} />;
    case "index":
      return <House color={focused ? "black" : "gray"} />;
    case "favorites":
      return <Heart color={focused ? "black" : "gray"} />;
    case "options":
      return <Heart color={focused ? "black" : "gray"} />;
    case "GerenciarProdutos":
      return <Heart color={focused ? "black" : "gray"} />;
    default:
      return <Heart color={focused ? "black" : "gray"} />;
  }
}