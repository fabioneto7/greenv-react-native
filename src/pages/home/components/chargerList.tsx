import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { sendBootNotification, sendStatusNotification } from '../../../mockApi/mockOCPPService'
import { RootStackNavigationProp } from '../../../types/typesRoute'

interface Charger {
  name: string,
  id: string,
  address: string,
  latitude: number,
  longitude: number,
  availability: string
}

export function ChargerList() {
  const navigation = useNavigation<RootStackNavigationProp>()
  const [chargerData, setChargerData] = useState<Charger[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bootNotificationResponse = await sendBootNotification()

        if (bootNotificationResponse.status === 'Accepted') {
          const statusNotificationResponse = await sendStatusNotification()

          setChargerData(statusNotificationResponse)
        } else {
          setChargerData([])
        }
      } catch (error) {
        console.error('Erro no OCPP simulador:', error)
      }
    }

    fetchData()
  }, [])

  const handleItemPress = (item: Charger) => {
    navigation.navigate('ChargerDetails', { charger: item })
  }

  const getStatusText = (status: string) => {
    return status === 'busy' ? 'Ocupado' : 'Disponível'
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logoGreenv.jpg')}
          style={styles.image}
        />
        <Text style={styles.title}>Lista de Carregadores</Text>
      </View>
      <FlatList
        data={chargerData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
            <View style={styles.row}>
              <Text style={styles.itemText}>{item.name}</Text>
              <View style={styles.row}>
                <Icon
                  name={item.availability === 'available' ? 'checkmark-circle' : 'close-circle'}
                  size={25}
                  color={item.availability === 'available' ? 'green' : 'red'}
                />
                <Text style={styles.itemText}>{getStatusText(item.availability)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'green',
    paddingTop: 36,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  title: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 3
  },
  item: {
    padding: 12,
    marginVertical: 2,
    backgroundColor: '#D3D3D3'
  },
  itemText: {
    fontSize: 18,
    color: '#000'
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
    marginLeft: 20
  }
})
