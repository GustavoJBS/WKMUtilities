import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Picker, TextInput } from 'react-native';
import { Container } from './styles';
import { TextInputMask } from 'react-native-masked-text'
import firebase from '../../services/firebaseConnection'
import { useNavigation } from '@react-navigation/native';
export default function CreateInfoCustosAdicionais({ route }) {
  const [ArrayCustos, setArrayCustos] = useState([])
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [ListaCustos, setListaCustos] = useState([]);
  const navigation = useNavigation()
  useEffect(() => {
    setListaCustos([
      {
        id: 1,
        nome: "Diárias"
      },
      {
        id: 2,
        nome: "Hotel"
      },
      {
        id: 3,
        nome: "Pedágio"
      },
      {
        id: 4,
        nome: "Condução(Avião, taxi, aluguel de carro)"
      }

    ]);
    forceUpdate()


  }, [])
  const CadastrarCustos = () => {
    firebase.database().ref('Serviços').child(route.params.id).child('custosadicionais').set(ArrayCustos)
  }

  useEffect(() => {
    if (route.params.ArrayCustos) {
      setArrayCustos(route.params.ArrayCustos);
      forceUpdate()
    }
  }, [])


  return (
    <Container>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40, paddingBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity onPress={() => {
              ArrayCustos.push({
                id: ArrayCustos.length + 1,
                nomeCusto: "Diárias",
                Quantidade: 0,
                valor: 0
              })
                ; forceUpdate();
            }} style={{ marginRight: 10 }}><Text style={{ fontSize: 20 }}>+</Text></TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{ArrayCustos.length}</Text>
            <TouchableOpacity onPress={() => { ArrayCustos.pop(); forceUpdate(); console.log(ArrayCustos) }} style={{ marginLeft: 10 }}><Text style={{ fontSize: 20 }}> - </Text></TouchableOpacity>
          </View>


          {
            ArrayCustos && ArrayCustos.length > 0 &&
            ArrayCustos.map((array, key) => {
              return (
                <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 30, borderWidth: 3, borderRadius: 10, borderColor: '#07AED3', padding: 10 }}>

                  <View style={{ width: '90%', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nome do Custo</Text>
                    <Picker style={{ width: '100%', borderWidth: 2, paddingLeft: 0, fontSize: 16 }}
                      onValueChange={(e) => { ArrayCustos[key].nomeCusto = e; forceUpdate(); console.log(ArrayCustos) }} mode={"dialog"}>
                      {
                        ListaCustos.map((response, key) => {
                          return (
                            <Picker.Item style={{ paddingLeft: 0 }} label={response.nome} key={key} value={response.nome} />
                          )

                        })
                      }
                    </Picker>
                  </View>
                  <View style={{ width: '90%', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Quantidade</Text>
                    <TextInput style={{ fontSize: 16, paddingLeft: 10 }} value={ArrayCustos[key].Quantidade && `${ArrayCustos[key].Quantidade}`} onChangeText={(e) => {
                      ArrayCustos[key].Quantidade = e; forceUpdate()
                    }} keyboardType="number-pad" placeholder="Digite a quantidade" />
                  </View>

                  <View style={{ width: '90%', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Valor Total</Text>

                    <TextInput style={{ fontSize: 16, paddingLeft: 10 }} value={ArrayCustos[key].valor && `${ArrayCustos[key].valor}`} onChangeText={(e) => {
                      ArrayCustos[key].valor = e; forceUpdate()
                    }} keyboardType="number-pad" placeholder="Digite a quantidade" />
                  </View>


                </View>
              )
            })

          }

          <TouchableOpacity style={{ flexDirection: 'row', width: '90%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => { CadastrarCustos(); navigation.navigate('ServiçoInfos', { id: route.params.id }) }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Cadastrar Serviço
            </Text>
          </TouchableOpacity>



        </View>
      </ScrollView>
    </Container >
  );
}