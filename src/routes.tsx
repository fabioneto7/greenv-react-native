import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'
import { ChargerList, ChargerDetails } from './pages/home'
import { Map } from './pages/map'
import { RootStackParamList } from './types/typesRoute'

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

function ChargerStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ChargerList" 
        component={ChargerList} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ChargerDetails" 
        component={ChargerDetails}
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  )
}

export function Routes(){
  return(
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ChargerStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => {
            if(focused) {
              return <Icon size={size} color={color} name="home" />
            }
            return <Icon size={size} color="#000"  name="home-outline" />
          }
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Map}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => {
            if(focused) {
              return <Icon size={size} color={color} name="location" />
            }
            return <Icon size={size} color="#000" name="location-outline" />
          }
        }}
      />
    </Tab.Navigator>
  )
}
