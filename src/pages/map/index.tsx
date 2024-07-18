import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


export function Map() {
  return (
    <View style={styles.container}>
      <Icon name='logo-github' size={80} color='#000'/>
      <Text style={styles.text}>Funcionalidade ainda não disponível,</Text>
      <Text style={styles.text}>Aguarde a proxima versão</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#000'
  }
})
