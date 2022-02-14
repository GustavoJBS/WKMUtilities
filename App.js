import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import AppProvider from './src/hooks';
import { useAuth } from './src/hooks/Auth';
import Login from './src/pages/Login';
import Routes from './src/routes';
import firebase from './src/services/firebaseConnection'
import AsyncStorage from '@react-native-community/async-storage';
console.disableYellowBox = true
export default function App() {




  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}