import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { Container } from './styles';
import { TextInputMask } from 'react-native-masked-text'
import DatePicker from 'react-native-datepicker/datepicker';
import { useService } from '../../hooks/Service';
import { useNavigation } from '@react-navigation/native';
export default function CreateInfosTempoViagem({ route }) {
  const [ArrayDias, setArrayDias] = useState([])
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const { createTempoViagem } = useService()
  const navigation = useNavigation()
  useEffect(() => {
    if (route.params.ArrayDias) {
      setArrayDias(route.params.ArrayDias);
    }
  }, [])
  return (
    <Container>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40, paddingBottom: 20 }}>
          <Text>Número de Turnos</Text>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity onPress={() => { ArrayDias.push({ data: `${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}-${(new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1}-${new Date().getFullYear()}`, quilometragem: 0, entrada: "", saida: "" }); forceUpdate(); console.log(ArrayDias) }} style={{ marginRight: 10 }}><Text style={{ fontSize: 20 }}>+</Text></TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{ArrayDias.length}</Text>
            <TouchableOpacity onPress={() => { ArrayDias.pop(); forceUpdate(); console.log(ArrayDias) }} style={{ marginLeft: 10 }}><Text style={{ fontSize: 20 }}> - </Text></TouchableOpacity>
          </View>

          <View style={{ width: '100%', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
            {
              ArrayDias.map((response, key) => {
                return (
                  <View key={key} style={{ width: '90%', alignItems: 'center', borderWidth: 1, marginTop: 20, borderRadius: 10, paddingTop: 15, paddingBottom: 15 }}>
                    <Text>Insira a Data {key + 1}</Text>
                    <DatePicker
                      style={{ width: '95%' }}
                      mode="date" // The enum of date, datetime and time
                      placeholder="select date"
                      format="DD-MM-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      date={ArrayDias[key].data}

                      onDateChange={(date) => {
                        ArrayDias[key].data = date;
                        forceUpdate()
                        console.log(ArrayDias)
                      }}
                    />
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
                        Quilometragem:
                      </Text>
                      <Text style={{ position: 'absolute', right: 0, bottom: 0, marginBottom: 10, marginRight: 20, fontSize: 18, fontWeight: 'bold' }}>Km</Text>
                      <TextInput
                        value={ArrayDias[key].quilometragem}
                        onChangeText={(e) => {
                          ArrayDias[key].quilometragem = e;
                          forceUpdate()
                          console.log(ArrayDias)
                        }} placeholder="Ex: 120" style={{ borderBottomWidth: 2, width: '90%', textAlign: 'center' }} />

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                      <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          De:
                        </Text>
                        <TextInputMask
                          value={ArrayDias[key].entrada}
                          type={'datetime'}
                          options={{
                            format: 'HH:mm'
                          }}
                          onChangeText={(e) => {
                            ArrayDias[key].entrada = e;
                            forceUpdate()
                            console.log(ArrayDias)
                          }}
                          style={{ borderBottomWidth: 2, width: '90%', textAlign: 'center' }}
                          placeholder="Ex: 07:00"
                        />
                      </View>
                      <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          Até:
                        </Text>
                        <TextInputMask
                          value={ArrayDias[key].saida}
                          type={'datetime'}
                          options={{
                            format: 'HH:mm'
                          }}
                          placeholder="Ex: 18:00"
                          onChangeText={(e) => {
                            ArrayDias[key].saida = e;
                            forceUpdate()
                          }}
                          style={{ borderBottomWidth: 2, width: '90%', textAlign: 'center' }}
                        />
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', width: '90%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => { createTempoViagem(route.params.id, ArrayDias); navigation.navigate('ServiçoInfos', { id: route.params.id }) }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Cadastrar Tempo de Viagem
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}