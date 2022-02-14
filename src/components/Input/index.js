import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Input({ nomeCampo, valorCampo }) {
  return (
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        {nomeCampo}
      </Text>
      <TextInput editable={false} value={valorCampo} style={{ width: '95%', height: 50, backgroundColor: '#aaa', borderRadius: 10, borderWidth: 3, borderColor: '#07AED3', fontSize: 18, color: '#000', textAlign: 'center', paddingLeft: 10 }} />
    </View>
  );
}