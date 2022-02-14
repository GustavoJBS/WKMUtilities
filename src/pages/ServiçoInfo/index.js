import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, ScrollView, TouchableOpacity, Image, Button, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Input from '../../components/Input';
import Routes from '../../routes';
import firebase from '../../services/firebaseConnection'
import ImagePicker from 'react-native-image-picker'
export default function ServiçoInfo({ route }) {
  const [DadosServiço, setDadosServiço] = useState(null);
  const [numeroHorasServiço, setNumeroHorasnumeroHorasServiço] = useState(0)
  const [numeroHorasViagem, setNumeroHorasViagem] = useState(0)
  const [Imagens, setImagens] = useState([])
  const [custosAdicionais, setCustosAdicionais] = useState([])
  const navigation = useNavigation()
  useEffect(() => {
    firebase.database().ref('Serviços').child(route.params.id).on('value', (snapshot) => {
      setDadosServiço(snapshot.val())
      try {
        if (typeof (snapshot.val().tempoServiço) === "object") {
          if (snapshot.val().tempoServiço) {
            let totalHoras = 0;
            snapshot.val().tempoServiço.map((response) => {
              totalHoras = totalHoras + (parseFloat(response.HorasdeServiço))
            })
            setNumeroHorasnumeroHorasServiço(totalHoras)
          }
          else {
            setNumeroHorasnumeroHorasServiço(totalHoras)
          }
        }
        if (snapshot.val().tempoViagem) {
          let totalHoras = 0;
          snapshot.val().tempoViagem.map((response) => {
            totalHoras = totalHoras + (parseFloat(response.HorasdeViagem))
          })
          setNumeroHorasViagem(totalHoras)
        }

        if (snapshot.val().custosadicionais) {
          const data = Object.values(snapshot.val().custosadicionais)
          let id = 1;
          Object.keys(snapshot.val().custosadicionais).map((keys, key) => {
            data[key].id = id
            data[key].id_custoadicional = keys
            id++;
          })
          setCustosAdicionais(data)
        }


        if (snapshot.val().Imagens) {
          const data = Object.values(snapshot.val().Imagens)
          let id = 1;
          Object.keys(snapshot.val().Imagens).map((keys, key) => {
            data[key].id = id
            data[key].id_Imagem = keys
            id++;
          })
          setImagens(data)
        }
      } catch (error) {

      }


    })

  }, [])

  const UploadImage = () => {
    const options = {
      title: "Selecione uma Foto",
      chooseFromLibraryButtonTitle: 'Buscar Foto do Album',
      mediaType: 'photo',
      includeBase64: false
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        alert("Não foi inserida nenhuma imagem")
      } else if (response.error) {
        alert("foi gerado algum erro" + response.error)
      }
      else {
        firebase.database().ref('Serviços').child(route.params.id).child('Imagens').push({
          imgLink: `data:image/png;base64,${response.data}`
        })
      }
    })
  }

  const deletarImage = (id) => {
    firebase.database().ref('Serviços').child(route.params.id).child('Imagens').child(id).remove()
  }

  return (
    <View>
      <ScrollView style={{ width: '100%', paddingBottom: 20 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
          <Input nomeCampo={"Nome do Cliente"} valorCampo={DadosServiço && DadosServiço.cliente.nome} />
          <Input nomeCampo={"Nome do Técnico"} valorCampo={DadosServiço && DadosServiço.tecnico.nome} />
          <Input nomeCampo={"Titulo do Serviço"} valorCampo={DadosServiço && DadosServiço.title} />

          {/*Máquina*/ <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {
              DadosServiço && !DadosServiço.maquina && <TouchableOpacity onPress={() => navigation.navigate("CreateInfosMaquina", { id: route.params.id })} style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginBottom: 30, marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Modelo da Máquina
                </Text>
              </TouchableOpacity>
            }
            {
              DadosServiço && DadosServiço.maquina &&
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Máquina</Text>
                <View style={{ width: '95%', borderWidth: 3, marginTop: 15, padding: 10, minHeight: 160, borderRadius: 10, borderColor: '#07AED3' }}>
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 17 }}>
                      Modelo: {DadosServiço.maquina.modelo}
                    </Text>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0, right: 0 }}>
                      <TouchableOpacity onPress={() => navigation.navigate("CreateInfosMaquina", { id: route.params.id })}>
                        <Icon color={'#07AED3'} name="edit" size={25} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => firebase.database().ref('Serviços').child(route.params.id).child('maquina').remove()}>
                        <Icon color={'#EF1B23'} name="trash" size={25} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ fontSize: 17, marginBottom: 10 }}>
                      Numero: {DadosServiço.maquina.numeroMaquina}
                    </Text>
                  </View>

                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 17, marginBottom: 10 }}>
                      Finura: {DadosServiço.maquina.Finura}
                    </Text>

                    <Text style={{ fontSize: 17, position: 'absolute', bottom: 0, right: 0, marginBottom: 10 }}>
                      Largura: {DadosServiço.maquina.Largura}''
                    </Text>
                  </View>

                  <View style={{ width: '100%', justifyContent: 'space-between', maxWidth: '95%' }}>
                    <Text style={{ fontSize: 17, marginBottom: 10 }}>
                      Descrição: {DadosServiço.maquina.Descricao}
                    </Text>


                  </View>



                </View>
              </View>
            }
          </View>
          }
          {/*Tempo de Serviço */<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
            {
              DadosServiço && !DadosServiço.tempoServiço && <TouchableOpacity onPress={() => navigation.navigate("CreateInfosTempoServiço", { id: route.params.id })} style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginBottom: 30, marginTop: 15, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Tempo de Serviço
                </Text>
              </TouchableOpacity>
            }

            {
              DadosServiço && DadosServiço.tempoServiço &&
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>

                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tempo de Serviço</Text>

                <View style={{ width: '95%', borderWidth: 3, marginTop: 15, padding: 10, minHeight: 160, borderRadius: 10, borderColor: '#07AED3' }}>
                  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16 }}>Numero de Dias: {DadosServiço.tempoServiço.length}</Text>

                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0, right: 0 }}>
                      <TouchableOpacity onPress={() => navigation.navigate("CreateInfosTempoServiço", { id: route.params.id, ArrayDias: DadosServiço.tempoServiço })}>
                        <Icon color={'#07AED3'} name="edit" size={25} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => firebase.database().ref('Serviços').child(route.params.id).child("tempoServiço").remove()}>
                        <Icon color={'#EF1B23'} name="trash" size={25} />
                      </TouchableOpacity>
                    </View>

                  </View>

                  <Text style={{ fontSize: 16 }}>Total de Horas: {numeroHorasServiço ? numeroHorasServiço : 0} Horas</Text>

                  <View style={{ marginTop: 20 }}>
                    {
                      DadosServiço.tempoServiço.map((response, key) => {
                        return (
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16 }}>
                              {response.data} : {response.entrada} - {response.saida} = {response.HorasdeServiço} Horas {response.ishoraextra && "- Hora Extra"}
                            </Text>
                          </View>
                        )
                      })
                    }
                  </View>
                </View>


              </View>
            }
          </View>
          }
          {/*Tempo de Viagem*/<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
            {
              DadosServiço && !DadosServiço.tempoViagem && <TouchableOpacity onPress={() => navigation.navigate("CreateInfosTempoViagem", { id: route.params.id })} style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginBottom: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Tempo de Viagem
                </Text>
              </TouchableOpacity>
            }
            {
              DadosServiço && DadosServiço.tempoViagem &&
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tempo de Viagem</Text>

                <View style={{ width: '95%', borderWidth: 3, marginTop: 15, padding: 10, minHeight: 160, borderRadius: 10, borderColor: '#07AED3' }}>
                  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16 }}>Numero de Dias: {DadosServiço.tempoViagem.length} </Text>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0, right: 0 }}>
                      <TouchableOpacity onPress={() => navigation.navigate("CreateInfosTempoViagem", { id: route.params.id, ArrayDias: DadosServiço.tempoViagem })}>
                        <Icon color={'#07AED3'} name="edit" size={25} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => firebase.database().ref('Serviços').child(route.params.id).child("tempoViagem").remove()}>
                        <Icon color={'#EF1B23'} name="trash" size={25} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={{ fontSize: 16 }}>Total de Horas: {numeroHorasViagem ? numeroHorasViagem : 0} Horas</Text>
                  <View style={{ marginTop: 20 }}>
                    {
                      DadosServiço.tempoViagem.map((response, key) => {
                        return (
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16 }}>
                              {response.data} : {response.entrada} - {response.saida} = {response.HorasdeViagem} Horas
                            </Text>
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
            }
          </View>
          }
          {/*Imagens do Serviço */<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
            {
              DadosServiço && !DadosServiço.Imagens && <TouchableOpacity onPress={() => {
                UploadImage()
              }} style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginBottom: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Inserir Imagem
                </Text>
              </TouchableOpacity>
            }


            {
              DadosServiço && DadosServiço.Imagens &&
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Imagens do Serviço</Text>
                <ScrollView horizontal={true} style={{ width: '100%' }}>

                  <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 20 }}>
                    <TouchableOpacity onPress={() => {
                      UploadImage()
                    }} style={{ width: 100, height: 100, marginLeft: 5, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
                      <IonicIcon color={'#fff'} name="image-outline" size={70} />
                    </TouchableOpacity>

                    {
                      Imagens && Imagens.map((response) => {
                        return (
                          <View style={{ width: 100, height: 100, marginLeft: 20 }}>
                            <Image style={{ width: 100, height: 100 }} source={{ uri: response.imgLink }} />

                            <TouchableOpacity onPress={() => deletarImage(response.id_Imagem)} style={{ position: 'absolute', top: 0, right: 0, justifyContent: 'center', alignItems: 'center', marginTop: -10, marginRight: -10 }}>
                              <IonicIcon style={{ backgroundColor: '#fff', borderRadius: 50 }} color={"#EF1B23"} name="remove-circle-outline" size={25} />
                            </TouchableOpacity>
                          </View>
                        )
                      })

                    }

                  </View>
                </ScrollView>
              </View>
            }

          </View>
          }
          {/*Custos Adicionais */<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
            {
              DadosServiço && !DadosServiço.custosadicionais && <TouchableOpacity onPress={() => navigation.navigate("CreateInfoCustosAdicionais", { id: route.params.id })} style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginBottom: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Inserir Custos Adicionais
                </Text>
              </TouchableOpacity>
            }
            {
              DadosServiço && DadosServiço.custosadicionais &&
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Custos Adicionais</Text>
                <View style={{ width: '95%', borderWidth: 3, marginTop: 15, padding: 10, minHeight: 160, borderRadius: 10, borderColor: '#07AED3' }}>
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', position: 'absolute', top: 0, right: 0 }}>
                      <TouchableOpacity onPress={() => navigation.navigate("CreateInfoCustosAdicionais", { id: route.params.id, ArrayCustos: custosAdicionais })}>
                        <Icon color={'#07AED3'} name="edit" size={25} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => firebase.database().ref('Serviços').child(route.params.id).child('custosadicionais').remove()}>
                        <Icon color={'#EF1B23'} name="trash" size={25} />
                      </TouchableOpacity>
                    </View>
                  </View>


                  {
                    custosAdicionais.map((response, key) => {
                      return (
                        <View key={key} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                          <Text style={{ fontSize: 17, marginBottom: 10 }}>
                            {response.nomeCusto} - {response.Quantidade} - R${parseFloat(response.valor).toFixed(2)}
                          </Text>
                        </View>
                      )
                    })
                  }




                </View>
              </View>
            }

          </View>
          }
          {/*Assinatura Técnico */<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
            {
              DadosServiço && !DadosServiço.AssinaturaTecnico && <TouchableOpacity onPress={() => navigation.navigate("Assinatura", { id: route.params.id, Assinatura: "tecnico" })} style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginBottom: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Assinatura do Técnico
                </Text>
              </TouchableOpacity>
            }
            {
              DadosServiço && DadosServiço.AssinaturaTecnico &&
              (
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 9, marginRight: 20 }} onPress={() => firebase.database().ref("Serviços").child(route.params.id).child("AssinaturaTecnico").remove()}>
                    <Icon color={'#EF1B23'} name="trash" size={30} />
                  </TouchableOpacity>
                  <Image style={{ width: '100%', height: 300 }} resizeMode="contain" source={{ uri: DadosServiço.AssinaturaTecnico }} />
                  <View style={{ borderTopWidth: 2, width: '90%', justifyContent: 'center', alignItems: 'center', paddingBottom: 55, position: 'absolute', bottom: 0 }} ><Text style={{ fontSize: 20, fontWeight: 'bold' }}>Assinatura do Técnico</Text></View>
                </View>

              )
            }

          </View>
          }
          {/*Assinatura Cliente */<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
            {
              DadosServiço && !DadosServiço.AssinaturaCliente && <TouchableOpacity onPress={() => navigation.navigate("Assinatura", { id: route.params.id, Assinatura: "cliente" })} style={{ flexDirection: 'row', justifyContent: 'center', width: '95%', backgroundColor: '#07AED3', height: 50, borderRadius: 10, marginBottom: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Assinatura do Cliente
                </Text>
              </TouchableOpacity>
            }
            {
              DadosServiço && DadosServiço.AssinaturaCliente &&
              (
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 9, marginRight: 20 }} onPress={() => firebase.database().ref("Serviços").child(route.params.id).child("AssinaturaCliente").remove()}>
                    <Icon color={'#EF1B23'} name="trash" size={30} />
                  </TouchableOpacity>
                  <Image style={{ width: '100%', height: 300 }} resizeMode="contain" source={{ uri: DadosServiço.AssinaturaCliente }} />
                  <View style={{ borderTopWidth: 2, width: '90%', justifyContent: 'center', alignItems: 'center', paddingBottom: 55, position: 'absolute', bottom: 0 }} ><Text style={{ fontSize: 20, fontWeight: 'bold' }}>Assinatura do Cliente</Text></View>
                </View>

              )
            }

          </View>
          }




        </View>

      </ScrollView>
    </View >
  );
}