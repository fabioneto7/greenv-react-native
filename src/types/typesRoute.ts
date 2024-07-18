import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

interface Charger {
  name: string,
  id: string,
  address: string,
  latitude: number,
  longitude: number,
  availability: string
}

export type RootStackParamList = {
  Home: undefined;
  ChargerList: undefined;
  ChargerDetails: { charger: Charger };
}

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>

export type RootTabParamList = {
  Home: undefined;
  Maps: undefined;
}

export type RootTabNavigationProp = BottomTabNavigationProp<RootTabParamList>
