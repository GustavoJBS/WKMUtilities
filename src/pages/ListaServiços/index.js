import React, { useEffect, useState, useRef, createRef } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container } from './styles'
import firebase from '../../services/firebaseConnection'
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useService } from '../../hooks/Service';
import SignatureCapture from 'react-native-signature-capture';
import { useAuth } from '../../hooks/Auth';
export default function ListaServiços() {
  const [Serviços, setServiços] = useState([])
  const navigation = useNavigation();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const { RemoverServiço } = useService()
  const { SignOut } = useAuth()
  const sign = createRef();
  useEffect(() => {
    setServiços([])
    firebase.database().ref('Serviços').on('value', (snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val())
        Object.keys(snapshot.val()).map((response, key) => {
          data[key].id = response
        })
        setServiços(data)
        forceUpdate()
      } else {
        setServiços([])
      }
    })
  }, [])
  return (
    <Container >
      <ScrollView style={{ width: '100%', backgroundColor: "#fff" }}>



        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


          <Image style={{ width: '80%' }} resizeMode="contain" source={require('../../assets/Logo.png')} />

          <TouchableOpacity onPress={() => { SignOut() }} style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginBottom: 30, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Sair do App
            </Text>
            <Ionicons style={{ marginLeft: 20 }} name="exit" color={'#000'} size={30} />
          </TouchableOpacity>



          <TouchableOpacity onPress={() => navigation.navigate('NovoServiço')} style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginBottom: 30, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Criar Novo Serviço
            </Text>
            <Icon size={20} name="chevron-down" />
          </TouchableOpacity>


          {
            Serviços && Serviços.sort((a, b) => {
              if (a.data > b.data) {
                return -1;
              }
              if (a.data < b.data) {
                return 1;
              }
              return 0
            }) && Serviços.map((response, key) => {

              return (

                <TouchableOpacity style={{ width: '90%', height: 100, borderWidth: 2, marginTop: 15, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }} key={key} onPress={() => navigation.navigate("ServiçoInfos", response)}>
                  <Text style={{ position: 'absolute', top: 0, marginTop: 10, marginLeft: 10, left: 0, color: '#07AED3', fontSize: 15, fontWeight: 'bold' }}  >
                    {key + 1}.Serviço:
                    {response.title}
                  </Text>
                  <Text style={{ position: 'absolute', marginBottom: 10, marginLeft: 10, left: 0, color: '#000', fontSize: 15, fontWeight: 'bold' }} >
                    Nome do Técnico:
                    {response.tecnico.nome}
                  </Text>

                  <Text style={{ position: 'absolute', bottom: 0, marginBottom: 10, marginLeft: 10, left: 0, color: '#000', fontSize: 15, fontWeight: 'bold' }} >
                    Nome do Cliente:
                    {response.cliente.nome}
                  </Text>


                  <TouchableOpacity onPress={() => navigation.navigate("UpdateServiço", response)} style={{ position: 'absolute', top: 0, right: 0, marginTop: 10, marginRight: 10 }}>
                    <Feather color={'#07AED3'} size={20} name="edit" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => RemoverServiço(response.id)} style={{ position: 'absolute', bottom: 0, right: 0, marginBottom: 10, marginRight: 10 }}>
                    <Feather color={'#EF1B23'} size={20} name="trash" />
                  </TouchableOpacity>


                </TouchableOpacity>

              )
            })
          }
        </View>
      </ScrollView >

    </Container >
  );
}
