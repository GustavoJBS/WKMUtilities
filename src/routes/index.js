import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/Auth';
import Login from '../pages/Login';
import AppRoutes from './app.routes';
export default function Routes() {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#131313" />
      </View>
    )
  }
  return (

    <NavigationContainer>
      {
        !user ?
          <Login />
          :
          <AppRoutes />
      }

    </NavigationContainer>
  )
}