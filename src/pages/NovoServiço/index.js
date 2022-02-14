import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, ScrollView, Image, TouchableOpacity, Text, Picker, TextInput, Alert } from 'react-native';
import { Container } from './styles';
import firebase from '../../services/firebaseConnection'
import { useService } from '../../hooks/Service';
import { useNavigation } from '@react-navigation/native';
export default function NovoServiço() {
  const [ListaCliente, setListaClientes] = useState([]);
  const [listaTécnico, setListaTécnicas] = useState([])
  const [Cliente, setCliente] = useState();
  const [Tecnico, setTecnico] = useState();
  const [tituloServiço, setTituloServiço] = useState()
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const { CadastrarServiço } = useService()
  const navigation = useNavigation();
  useEffect(() => {
    firebase.database().ref('Clientes').on('value', (snapshot) => {
      setListaClientes([])
      if (snapshot.val()) {
        const data = Object.values(snapshot.val())
        let id = 1;
        Object.keys(snapshot.val()).map((keys, key) => {
          data[key].id_cliente = keys
          id++;
        })

        setListaClientes(data)
      } else {
        setListaClientes([])
      }

      forceUpdate()

    })

    firebase.database().ref('Técnicos').on('value', (snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val())
        let id = 1;
        Object.keys(snapshot.val()).map((keys, key) => {
          data[key].id_tecnico = keys
          id++;
        })
        console.log(snapshot.val())
        setListaTécnicas(data)
      } else {
        setListaTécnicas([])
      }

      forceUpdate()
    })
  }, [])

  const CadastrarServiços = () => {
    let titulo = tituloServiço;
    CadastrarServiço(titulo, Cliente, Tecnico).then(() => {
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
              <Picker style={{ width: '100%', borderWidth: 2 }} mode={"dialog"} onValueChange={(e) => { setCliente(e); forceUpdate() }}>
                {
                  ListaCliente && ListaCliente.map((response, key) => {
                    console.log(response)
                    return (
                      <Picker.Item key={key} label={response.nome} value={response} />
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
              <Picker style={{ width: '100%', borderWidth: 2 }} mode={"dialog"} onValueChange={(e) => { setTecnico(e); forceUpdate() }}>

                {
                  listaTécnico && listaTécnico.length > 0 && listaTécnico.map((response, key) => {
                    return (
                      <Picker.Item key={key} label={response.nome} value={response} />
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
            <TextInput multiline placeholder="Insira o Titulo" onChangeText={(e) => setTituloServiço(e)} value={tituloServiço} style={{ width: '100%', minHeight: 50, backgroundColor: '#aaa', borderRadius: 10, borderWidth: 3, borderColor: '#07AED3', fontSize: 18, color: '#000', paddingLeft: 10 }} />
          </View>




          <TouchableOpacity style={{ flexDirection: 'row', width: '90%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => CadastrarServiços()}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Cadastrar Serviço
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </Container>
  );
}