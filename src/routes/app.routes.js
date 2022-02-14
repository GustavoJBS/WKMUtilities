import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListaServiços from '../pages/ListaServiços';
import NovoServiço from '../pages/NovoServiço';
import ServiçoInfo from '../pages/ServiçoInfo';
import CreateInfosMaquina from '../pages/CreateInfosMaquina';
import UpdateServiço from '../pages/UpdateServiço';
import CreateInfosTempoServiço from '../pages/CreateInfosTempoServiço';
import CreateInfosTempoViagem from '../pages/CreateInfosTempoViagem';
import Assinatura from '../pages/Assinatura';
import CreateInfoCustosAdicionais from '../pages/CreateInfoCustosAdicionais';
const RoutesStack = createStackNavigator();

function AppRoutes() {
  return (
    <RoutesStack.Navigator >
      <RoutesStack.Screen
        name="ListaServiços"
        component={ListaServiços}
        options={{
          headerShown: false
        }} />
      <RoutesStack.Screen
        name="NovoServiço"
        component={NovoServiço}
        options={{
          title: "Criar Novo Serviço",
          cardStyle: {
            backgroundColor: '#fff',
            paddingTop: 15
          },
          headerStyle: {
            borderBottomWidth: 1

          }
        }} />
      <RoutesStack.Screen
        name="UpdateServiço"
        component={UpdateServiço}
        options={{
          title: "Editar Serviço",
          cardStyle: {
            backgroundColor: '#fff',
            paddingTop: 15
          },
          headerStyle: {
            borderBottomWidth: 1

          }
        }} />



      <RoutesStack.Screen
        name="ServiçoInfos"
        component={ServiçoInfo}
        options={{
          title: "Informações do Serviço",
          cardStyle: {
            backgroundColor: '#fff',
            paddingTop: 15
          },
          headerStyle: {
            borderBottomWidth: 1

          }
        }} />


      <RoutesStack.Screen
        name="CreateInfosMaquina"
        component={CreateInfosMaquina}
        options={{
          title: "Máquina",
          cardStyle: {
            backgroundColor: '#fff',
            paddingTop: 15
          },
          headerStyle: {
            borderBottomWidth: 1

          }
        }} />

      <RoutesStack.Screen
        name="CreateInfosTempoServiço"
        component={CreateInfosTempoServiço}
        options={{
          title: "Tempo Serviço",
          cardStyle: {
            backgroundColor: '#fff',
            paddingTop: 15
          },
          headerStyle: {
            borderBottomWidth: 1

          }
        }} />

      <RoutesStack.Screen
        name="CreateInfosTempoViagem"
        component={CreateInfosTempoViagem}
        options={{
          title: "Tempo Viagem",
          cardStyle: {
            backgroundColor: '#fff',
            paddingTop: 15
          },
          headerStyle: {
            borderBottomWidth: 1

          }
        }} />

      <RoutesStack.Screen
        name="CreateInfoCustosAdicionais"
        component={CreateInfoCustosAdicionais}
        options={{
          title: "Custos Adicionais",
          cardStyle: {
            backgroundColor: '#fff',
            paddingTop: 15
          },
          headerStyle: {
            borderBottomWidth: 1

          }
        }} />

      <RoutesStack.Screen
        name="Assinatura"
        component={Assinatura}
        options={{
          title: "Assinatura",
          cardStyle: {
            backgroundColor: '#fff',
            paddingTop: 15
          },
          headerStyle: {
            borderBottomWidth: 1

          }
        }} />






    </RoutesStack.Navigator>
  )
}

export default AppRoutes;