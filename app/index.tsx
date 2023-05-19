//* Libraries imports
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from "react";
import { useRouter } from 'expo-router';

//* Components imports
import StyledInput from '../src/components/common/StyledInput/InputOne';

//* Utils imports
import firebase from "@services/connectionFirebase";

//* Store imports
import { userStore } from "@store/user";

type Props = {
  changeStatus: (uid: string) => void;
}

export default function Login(props: Props) {
  const [type, setType] = useState<"login" | "register">("login");
  const [userCredentials, setUserCredentials] = useState({
    email: "", password: "", name: ""
  });

  const router = useRouter();

  function handleLogin() {
    if (type === 'login') {
      // Aqui fazemos o login
      firebase.auth().signInWithEmailAndPassword(userCredentials.email, userCredentials.password)
        .then((user) => {
          // props.changeStatus(user.user.uid)
          if (!user) return;
          if (!user.user) return;
          // add user to store
          userStore.setState({
            user: {
              id: user.user.uid,
              email: user.user.email || "",
              name: user.user.displayName || "",
              isLogedIn: true
            }
          });
          router.push('/home');
        })
        .catch((err) => {
          console.log(err);
          alert('Email ou senha não cadastrados!');
          return;
        })
    } else {
      // Aqui cadastramos o usuario 
      firebase.auth().createUserWithEmailAndPassword(userCredentials.email, userCredentials.password)
        .then((user) => {
          // props.changeStatus(user.user.uid);
          console.log("Cadastrado com sucesso!");
        })
        .catch((err) => {
          console.log(err);
          alert('Erro ao Cadastrar!');
          return;
        })
    }
  }

  // if the user is already logged in, redirect to home
  if (userStore.getState().user.isLogedIn) {
    router.push('/home');
  }

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <View className='relative flex flex-col items-center justify-center flex-1 w-full h-full p-4 bg-neutral-100'>
        <StyledInput
          label="Insira seu email"
          setValue={(e) => { setUserCredentials({ ...userCredentials, email: e }) }}
        />
        <StyledInput
          label="Insira sua senha"
          setValue={(e) => { setUserCredentials({ ...userCredentials, password: e }) }}
          password
        />

        <TouchableOpacity
          className='flex items-center justify-center w-full px-4 py-4 mt-4 bg-green-600 rounded-2xl'
          onPress={handleLogin}
        >
          <Text className='text-2xl font-bold text-white uppercase'>
            {type === "login" ? "Entrar" : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className='absolute bottom-0 left-0 flex items-center justify-center w-full mb-4 ml-4'>
          <Text className='text-lg'>
            Não tem uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
