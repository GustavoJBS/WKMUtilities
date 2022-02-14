
import { useNavigation } from '@react-navigation/native';
import React, { createRef, useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, Linking } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import Icon from 'react-native-vector-icons/Feather';
import firebase from '../../services/firebaseConnection'
export default function Assinatura({ route }) {
  let sign = createRef()
  const navigation = useNavigation()
  useEffect(() => {
    console.log(route.params.Assinatura)
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Image style={{ width: '80%' }} resizeMode="contain" source={require('../../assets/Logo.png')} />
      </View>


      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => sign.current.resetImage()} style={{ height: 50, borderRadius: 10, width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 15, backgroundColor: '#07AED3' }}><Text style={{ fontSize: 18, fontWeight: 'bold' }}>Limpar Assinatura</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { sign.current.saveImage(); navigation.navigate('ServiçoInfos', { id: route.params.id }) }} style={{ height: 50, borderRadius: 10, width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 15, backgroundColor: '#07AED3' }}><Text style={{ fontSize: 18, fontWeight: 'bold' }}>Salvar Assinatura</Text></TouchableOpacity>
      </View>
      {/*
        LinkAssinatura !== "" && (
          <>
            <Image style={{ width: 100, height: 50, borderWidth: 1, borderColor: 'red' }} source={{ uri: LinkAssinatura }} />

            <TouchableOpacity style={{ color: 'blue' }}
              onPress={() => Linking.openURL(`${LinkAssinatura}`)}>
              <Text>
                Google
              </Text>

            </TouchableOpacity>
          </>
        )*/
      }



      <SignatureCapture
        ref={sign}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        backgroundColor="transparent"
        strokeColor="#000000"
        minStrokeWidth={6}
        maxStrokeWidth={6}
        showNativeButtons={false}
        viewMode="portrait"
        onSaveEvent={(e) => {
          route.params.Assinatura == "tecnico"
            ?
            firebase.database().ref("Serviços").child(route.params.id).update({
              AssinaturaTecnico: `data:image/png;base64,${e.encoded}`
            })
            :

            firebase.database().ref("Serviços").child(route.params.id).update({
              AssinaturaCliente: `data:image/png;base64,${e.encoded}`
            })
        }}
        saveImageFileInExtStorage={true}
        importantForAccessibility={'yes'}

      >
      </SignatureCapture>
      <View style={{ width: '100%', position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center', marginBottom: '30%' }}>
        <View style={{ backgroundColor: '#000', height: 4, width: '80%' }}></View>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Assinatura</Text>
      </View>
    </View >
  );
}