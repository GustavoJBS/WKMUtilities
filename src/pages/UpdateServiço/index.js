import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, ScrollView, Image, TouchableOpacity, Text, Picker, TextInput, Alert } from 'react-native';
import { Container } from './styles';
import firebase from '../../services/firebaseConnection'
import { useService } from '../../hooks/Service';
import { useNavigation } from '@react-navigation/native';
export default function UpdateServiço({ route }) {
  const [ListaCliente, setListaClientes] = useState([]);
  const [ListaTécnico, setListaTécnicas] = useState([])
  const [Cliente, setCliente] = useState();
  const [Tecnico, setTecnico] = useState();
  const [tituloServiço, setTituloServiço] = useState()
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const navigation = useNavigation();
  const { AtualizarServiço } = useService()
  useEffect(() => {
    setTituloServiço(route.params.title)
    ListaCliente.push(route.params.cliente)
    firebase.database().ref('Clientes').on('value', (snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val())
        Object.keys(snapshot.val()).map((response, key) => {
          data[key].id = response
        })
        data.map((response) => {
          if (response.nome !== route.params.cliente.nome) {
            ListaCliente.push(response)
          }
        })
        forceUpdate()
      }

    })
    ListaTécnico.push(route.params.tecnico)

    firebase.database().ref('Técnicos').on('value', (snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val())
        Object.keys(snapshot.val()).map((response, key) => {
          data[key].id = response
        })
        data.map((response) => {
          if (response.nome !== route.params.tecnico.nome) {

            ListaTécnico.push(response)
          }
        })
        console.log(snapshot.val())
        forceUpdate()
      }

    })

  }, [])
  const atualizarServiço = () => {
    let titulo = tituloServiço;

    AtualizarServiço(route.params.id, titulo, Cliente, Tecnico).then(() => {
      navigation.navigate("ListaServiços")
    })
  }


  return (
    <Container>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>

          <View style={{ width: '95%', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Cliente:
            </Text>
            <View value={Cliente && Cliente.nome} style={{ borderRadius: 10, borderWidth: 0, overflow: "hidden", padding: 0, width: '100%', backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#07AED3' }}>
              <Picker onValueChange={(e) => { setCliente(e); forceUpdate(); console.log(e) }} style={{ width: '100%', borderWidth: 2 }} mode={"dialog"} >
                {
                  ListaCliente.map((response) => {
                    return (
                      <Picker.Item label={response.nome} value={response} />
                    )
                  })
                }
              </Picker>
            </View>
          </View>

          <View style={{ width: '95%', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Técnico do Serviço:
            </Text>
            <View style={{ borderRadius: 10, borderWidth: 0, overflow: "hidden", padding: 0, width: '100%', backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#07AED3' }}>
              <Picker onValueChange={(e) => { setTecnico(e); forceUpdate(); console.log(e) }} style={{ width: '100%', borderWidth: 2 }} mode={"dialog"} >
                {
                  ListaTécnico.map((response) => {
                    return (
                      <Picker.Item label={response.nome} value={response} />
                    )
                  })
                }
              </Picker>
            </View>
          </View>


          <View style={{ width: '95%', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Titulo do Serviço:
            </Text>
            <TextInput value={tituloServiço} multiline placeholder="Insira o Titulo" onChangeText={(e) => setTituloServiço(e)} value={tituloServiço} style={{ width: '100%', minHeight: 50, backgroundColor: '#aaa', borderRadius: 10, borderWidth: 3, borderColor: '#07AED3', fontSize: 18, color: '#000', paddingLeft: 10 }} />
          </View>




          <TouchableOpacity style={{ flexDirection: 'row', width: '90%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => atualizarServiço()}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Cadastrar Serviço
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </Container >
  );
}