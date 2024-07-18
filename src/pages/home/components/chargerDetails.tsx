import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, PermissionsAndroid, ScrollView } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { RouteProp } from '@react-navigation/native'
import { getDistance } from 'geolib'
import { RootStackParamList } from '../../../types/typesRoute'
import { fetchRandomImage } from '../../../mockApi/mockApiImage'
import { StackNavigationProp } from '@react-navigation/stack'

const { width } = Dimensions.get('window')

type ChargerDetailsRouteProp = RouteProp<RootStackParamList, 'ChargerDetails'>

interface ImageData {
  id: string;
  url: any;
  title: string;
}

type Props = {
  route: ChargerDetailsRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'ChargerDetails'>;
}

const ChargerDetails: React.FC<Props> = ({ route, navigation }) => {
  const { charger } = route.params
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false)
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [isMounted, setIsMounted] = useState<boolean>(true)

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Localização',
            message: 'Este aplicativo precisa acessar sua localização.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionGranted(true)
        } else {
          console.warn('Permissão de localização negada')
        }
      } catch (err) {
        console.warn(err)
      }
    }

    requestLocationPermission()

    return () => {
      setIsMounted(false)
    }

  }, [])

  const getUserLocation = () => {
    if (permissionGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
    }
  }
  
  useEffect(() => {
    getUserLocation()
  }, [permissionGranted, isMounted])

  const calculateDistance = (latitude: number, longitude: number) => {
    if (userLocation) {
      return getDistance(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude, longitude }
      ) / 1000
    }
    return 0
  }

  const getStatusText = (status: string) => {
    return status === 'busy' ? 'Ocupado' : 'Disponível'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await fetchRandomImage()
        if (isMounted) {
          setImageData(image)
        }
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchData()
  }, [isMounted])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logoGreenv.jpg')}
          style={styles.imageLogo}
        />
        <Text style={styles.titleHeader}>Detalhes do Carregador</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>{charger.name}</Text>
        </View>
        <View style={styles.data}>
          <View style={styles.row}>
            <Text style={styles.descriptionId}>Id: </Text>
            <Text style={styles.description}>{charger.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionId}>Endereço: </Text> 
            <Text style={styles.description}>{charger.address}</Text> 
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionId}>Disponibilidade: </Text>
            <Text style={styles.description}>{getStatusText(charger.availability)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.descriptionId}>Distância: </Text>
            <Text style={styles.description}>{userLocation
              ? `${calculateDistance(charger.latitude, charger.longitude)} km`
              : 'Calculando...'}
            </Text>
          </View>
          <Image 
            source={imageData ? imageData.url : { uri: `https://via.placeholder.com/150?text=${charger.name}` }} 
            style={styles.image} 
          />
        </View>
      </ScrollView>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: 'green',
    paddingTop: 36,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  imageLogo: {
    width: width * 0.2,
    height: width * 0.2,
    marginRight: width * 0.05,
    marginLeft: width * 0.05,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05
  },
  data: {
    alignItems: 'flex-start',
    padding: width * 0.05
  },
  subHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  subHeaderTitle: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold'
  },
  titleHeader: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },
  descriptionId: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 20,
    color: '#000',
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    marginTop: 8,
    width: '100%',
    height: width * 0.8
  },
  viewButton: {
    paddingBottom: 30,
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#0e0e0e',
    width: width * 0.8,
    alignSelf: 'center'
    
  },
  buttonText: {
    color: '#FFF'
  }
})

export { ChargerDetails }