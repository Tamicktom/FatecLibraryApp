//* Libraries imports
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";
import { useRouter } from 'expo-router';

//* Components imports
import StyledInput from '../src/components/common/StyledInput/StyledInput';

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
    email: "", password: ""
  });

  const router = useRouter();

  function handleLogin() {
    if (type === 'login') {
      // Aqui fazemos o login
      const user = firebase.auth().signInWithEmailAndPassword(userCredentials.email, userCredentials.password)
        .then((user) => {
          // props.changeStatus(user.user.uid)
          console.log("Logado com sucesso!");
          console.log(user);
          userStore.setState({
            user: {
              id: user.user.uid,
              email: user.user.email,
              name: user.user.displayName,
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
      const user = firebase.auth().createUserWithEmailAndPassword(userCredentials.email, userCredentials.password)
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

  useEffect(() => {
    console.log(userCredentials);
  }, [userCredentials])

  // if the user is already logged in, redirect to home
  if (userStore.getState().user.isLogedIn) {
    router.push('/home');
  }

  return (
    <SafeAreaView className="flex-1">
      <View className='flex flex-col items-center justify-center flex-1 w-full h-full bg-black'>
        <StyledInput
          label="Insira seu email"
          setValue={(e) => { setUserCredentials({ ...userCredentials, email: e }) }}
        />
        <StyledInput
          label="Insira sua senha"
          setValue={(e) => { setUserCredentials({ ...userCredentials, password: e }) }}
          password
        />
        <StatusBar style="auto" />

        <TouchableOpacity
          className='flex items-center justify-center w-5/6 px-4 py-4 mt-4 bg-white rounded-2xl'
          onPress={handleLogin}
        >
          <Text>
            {type === "login" ? "Entrar" : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>
            Não tem uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
