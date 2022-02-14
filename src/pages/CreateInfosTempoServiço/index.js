import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';
import { useService } from '../../hooks/Service';
import { Container } from './styles'
import { TextInputMask } from 'react-native-masked-text'
import { hoursToMinutes } from 'date-fns'
import DatePicker from 'react-native-datepicker/datepicker';
export default function CreateInfosTempoServiço({ route }) {
  const [ArrayDias, setArrayDias] = useState([])
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const { createTempoServiço } = useService();
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

            <TouchableOpacity onPress={() => { ArrayDias.push({ data: `${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}-${(new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1}-${new Date().getFullYear()}`, entrada: "", saida: "", ishoraextra: false/*, horasAlmoço: 0*/ }); forceUpdate(); console.log(ArrayDias) }} style={{ marginRight: 10 }}><Text style={{ fontSize: 20 }}>+</Text></TouchableOpacity>
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

                    <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                      <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                          Horário Entrada
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
                          Horário Saída
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
                          style={{ borderBottomWidth: 2, width: '90%', textAlign: 'center' }} />
                      </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 30, marginLeft: 20, flexDirection: 'row' }}>
                      <Switch
                        trackColor={{ false: "#767577", true: "#07AED3" }}
                        thumbColor={ArrayDias[key].ishoraextra ? "#EF1B23" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { ArrayDias[key].ishoraextra = !ArrayDias[key].ishoraextra; forceUpdate(); console.log(ArrayDias[key].ishoraextra) }}
                        value={ArrayDias[key].ishoraextra}
                      />
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>É Hora Extra?</Text>
                    </View>
                    {
                      /* Horas de Almoço
                       <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        Horas de Almoço
                      </Text>
                      <TextInput
                        value={ArrayDias[key].horasAlmoço}
                        onChangeText={(e) => {
                          ArrayDias[key].horasAlmoço = e;
                          forceUpdate()
                          console.log(ArrayDias)
                        }} placeholder="Ex: 12:00" style={{ borderBottomWidth: 2, width: '90%', textAlign: 'center' }} />
                    </View>
                      */
                    }

                  </View>
                )
              }
              )
            }
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', width: '90%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => { createTempoServiço(route.params.id, ArrayDias); navigation.navigate('ServiçoInfos', { id: route.params.id }) }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Cadastrar Tempo de Serviço
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container >
  );
}


