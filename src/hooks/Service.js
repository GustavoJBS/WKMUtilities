import React, { useState, createContext, useEffect, useContext } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

export const ServiceContext = createContext({});


export function ServiceProvider({ children }) {
  const CadastrarServiço = async (titulo, Cliente, Tecnico) => {

    await firebase.database().ref('Serviços').push({
      title: titulo,
      cliente: Cliente,
      tecnico: Tecnico,
      data: String(new Date().getTime())
    })
  }


  const RemoverServiço = async (id) => {
    await firebase.database().ref('Serviços').child(id).remove()
  }

  const AtualizarServiço = async (idServiço, titulo, Cliente, Tecnico) => {
    await firebase.database().ref('Serviços').child(idServiço).update({
      title: titulo,
      cliente: Cliente,
      tecnico: Tecnico,
      data: String(new Date().getTime())
    })
  }
  const createMaquina = (idServiço, Modelo,
    Numero,
    Finura,
    Largura,
    Descricao) => {
    firebase.database().ref('Serviços').child(idServiço).child('maquina').update({
      modelo: Modelo,
      numeroMaquina: Numero,
      Finura: Finura,
      Largura: Largura,
      Descricao: Descricao
    })
  }

  const createTempoServiço = (
    idServiço,
    TempoServiço
  ) => {
    firebase.database().ref('Serviços').child(idServiço).child('tempoServiço').set(TempoServiço).then(() => {
      firebase.database().ref('Serviços').child(idServiço).child('tempoServiço').once('value', (snapshot) => {
        console.log(snapshot.val())
        snapshot.val().map((response, key) => {
          firebase.database().ref('Serviços').child(idServiço).child('tempoServiço').child(key).update({
            HorasdeServiço: Math.abs((((response.saida.split(":")["0"] - response.entrada.split(":")["0"]) * 60) + (response.saida.split(":")["1"] - response.entrada.split(":")["1"])) / 60) /*- response.horasAlmoço*/
          }).then(() => {
            
          })
        })
      })
    })
  }

  const createTempoViagem = (
    idServiço,
    TempoViagem) => {
    firebase.database().ref('Serviços').child(idServiço).child('tempoViagem').set(TempoViagem).then(() => {
      firebase.database().ref('Serviços').child(idServiço).child('tempoViagem').once('value', (snapshot) => {
        snapshot.val().map((response, key) => {
          firebase.database().ref('Serviços').child(idServiço).child('tempoViagem').child(key).update({
            HorasdeViagem: Math.abs((((response.saida.split(":")["0"] - response.entrada.split(":")["0"]) * 60) + (response.saida.split(":")["1"] - response.entrada.split(":")["1"])) / 60) /*- response.horasAlmoço*/
          })
        })
      })
    })
  }
  return (
    <ServiceContext.Provider value={{ CadastrarServiço, RemoverServiço, createMaquina, AtualizarServiço, createTempoServiço, createTempoViagem }}>
      {children}
    </ServiceContext.Provider>
  );
}


export function useService() {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error('useAuth must be used within an ServiceProvider');
  }

  return context;
}