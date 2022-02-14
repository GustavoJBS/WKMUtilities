import React, { useState, useEffect } from 'react';
import {
  View, Image, Text, TextInput, TouchableOpacity, ScrollView
} from 'react-native';
import Logo from '../../assets/Logo.png';
import firebase from '../../services/firebaseConnection'
import AsyncStorage from '@react-native-community/async-storage';
import { useAuth } from '../../hooks/Auth';
// import { Container } from './styles';

const Login = () => {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const { signIn } = useAuth()




  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 50 }}>
          <Image style={{ width: '80%' }} resizeMode="contain" source={require('../../assets/Logo.png')} />
          <Text style={{ fontSize: 20, maxWidth: '90%', textAlign: 'center', fontWeight: 'bold' }}>
            Digite o Usuário e Senha cadastrado pelo Administrador
          </Text>
          <TextInput onChangeText={(e) => setUsuario(e)} value={usuario} style={{ width: '85%', borderWidth: 2, borderRadius: 15, marginTop: 20, textAlign: 'center', borderColor: '#07AED3', backgroundColor: '#ccc', color: '#000', fontWeight: 'bold', fontSize: 18 }} placeholder="Digite o Usuário" />
          <TextInput secureTextEntry onChangeText={(e) => setSenha(e)} value={senha} style={{ width: '85%', borderWidth: 2, borderRadius: 15, marginTop: 20, textAlign: 'center', borderColor: '#07AED3', backgroundColor: '#ccc', color: '#000', fontWeight: 'bold', fontSize: 18 }} placeholder="Digite a Senha" />

          <TouchableOpacity onPress={() => signIn(usuario, senha)} style={{ marginTop: 30, width: '90%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontWeight: 'bold', fontSize: 18 }}>Acessar</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </View>


  );
}

export default Login;