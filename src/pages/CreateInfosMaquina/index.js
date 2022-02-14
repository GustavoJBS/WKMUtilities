import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useService } from '../../hooks/Service';
import { Container } from './styles'
import firebase from '../../services/firebaseConnection'
export default function CreateInfosMaquina({ route }) {
  const [Modelo, setModelo] = useState()
  const [Numero, setNumero] = useState()
  const [Finura, setFinura] = useState()
  const [Largura, setLargura] = useState()
  const [Descricao, setDescricao] = useState()
  const { createMaquina } = useService()
  const navigation = useNavigation()
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
    firebase.database().ref('Serviços').child(route.params.id).child('maquina').on('value', (snapshot) => {
      if (snapshot.val()) {
        setModelo(snapshot.val().modelo)
        setNumero(snapshot.val().numeroMaquina)
        setFinura(snapshot.val().Finura)
        setLargura(snapshot.val().Largura)
        setDescricao(snapshot.val().Descricao)
      }

    })


  }, [])
  const CriarMaquina = () => {
    createMaquina(
      route.params.id,
      Modelo,
      Numero,
      Finura,
      Largura,
      Descricao)
    navigation.navigate("ServiçoInfos", { id: route.params.id })

  }
  return (
    <Container>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
          <View style={{ width: '95%', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Modelo da Máquina:
            </Text>
            <TextInput value={Modelo} onChangeText={(e) => setModelo(e)} placeholder="Insira o Modelo da Máquina" style={{ width: '100%', minHeight: 50, backgroundColor: '#aaa', borderRadius: 10, borderWidth: 3, borderColor: '#07AED3', fontSize: 18, color: '#000', paddingLeft: 10 }} />
          </View>
          <View style={{ width: '95%', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Número da Máquina:
            </Text>
            <TextInput value={Numero} onChangeText={(e) => setNumero(e)} placeholder="Insira o Número da Máquina" style={{ width: '100%', minHeight: 50, backgroundColor: '#aaa', borderRadius: 10, borderWidth: 3, borderColor: '#07AED3', fontSize: 18, color: '#000', paddingLeft: 10 }} />
          </View>

          <View style={{ width: '95%', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Finura:
            </Text>
            <TextInput value={Finura} onChangeText={(e) => setFinura(e)} keyboardType="number-pad" multiline placeholder="Insira a Finura da Máquina" style={{ width: '100%', minHeight: 50, backgroundColor: '#aaa', borderRadius: 10, borderWidth: 3, borderColor: '#07AED3', fontSize: 18, color: '#000', paddingLeft: 10 }} />
          </View>

          <View style={{ width: '95%', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Largura:
            </Text>
            <TextInput value={Largura} onChangeText={(e) => setLargura(e)} keyboardType="number-pad" placeholder="Insira a Largura da Máquina" style={{ width: '100%', minHeight: 50, backgroundColor: '#aaa', borderRadius: 10, borderWidth: 3, borderColor: '#07AED3', fontSize: 18, color: '#000', paddingLeft: 10 }} />
          </View>

          <View style={{ width: '95%', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Descrição:
            </Text>
            <TextInput value={Descricao} onChangeText={(e) => setDescricao(e)} multiline placeholder="Insira o Número da Máquina" style={{ width: '100%', minHeight: 50, backgroundColor: '#aaa', borderRadius: 10, borderWidth: 3, borderColor: '#07AED3', fontSize: 18, color: '#000', paddingLeft: 10 }} />
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', width: '90%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => CriarMaquina()}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Cadastrar Máquina
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </Container >
  );
}