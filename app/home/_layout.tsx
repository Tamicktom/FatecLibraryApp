import { Tabs } from "expo-router";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { MagnifyingGlass, House } from "phosphor-react-native";

//* Store import
import { userStore } from "@store/user";

export default function Layout() {
  const router = useRouter();

  if (!userStore.getState().user.isLogedIn) {
    console.warn('User not logged in');
    router.push('/login');
  }

  return (
    <SafeAreaProvider className="flex flex-1">
      <Tabs>
        <Tabs.Screen name="index"
          options={{
            tabBarIcon: () => <House />,
            headerShown: false,
            title: ''
          }} />
        <Tabs.Screen name="pokedex"
          options={{
            tabBarIcon: () => <MagnifyingGlass />,
            headerShown: false,
            title: ''
          }} />
      </Tabs>
    </SafeAreaProvider>
  );
}