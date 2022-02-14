import React, { useState, createContext, useEffect, useContext } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext({});


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
    async function loadStorage() {

      const storageUser = await AsyncStorage.getItem('wkm_user');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }

    loadStorage();
  }, [])

  function signIn(usuario, senha) {
    firebase.database().ref('UsuariosApp').once('value').then((snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val())
        Object.keys(snapshot.val()).map((response, key) => {
          data[key].id = response
        })
        let usuarioativado;
        data.map(async (usuarios) => {
          if (usuario === usuarios.nome && senha === usuarios.senha) {
            usuarioativado = usuario
            StorageUser(usuarios)
            setUser(usuarios)
            forceUpdate()

          }

        })
        if (!usuarioativado) {
          alert("Digite um usuário valido")
        }
      }
    })
  }

  async function SignOut() {
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
      })
  }
  async function StorageUser(data) {
    await AsyncStorage.setItem('wkm_user', JSON.stringify(data));
  }



  return (
    <AuthContext.Provider value={{ user, SignOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an ServiceProvider');
  }

  return context;
}