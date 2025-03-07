import { Settings, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import IonIcons from 'react-native-vector-icons/Ionicons';
import DrawerNavigator from './DrawerNavigator'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const Tab=createBottomTabNavigator()
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={
      {
        tabBarStyle:styles.tabBarStyle,
        tabBarActiveTintColor:'#fefae0',
        tabBarLabelStyle:{
          fontSize:12,
          fontWeight:'bold',
          marginBottom:8,
        }

      }
    }>
      <Tab.Screen name='Home' component={Home} options={{
        title:'Ana Sayfa',
        headerShown:false,
        tabBarIcon:({focused})=>{
          return <IonIcons name='home'  size={22} color={focused ? '#fefae0' : 'gray' }  />
        }
      }} />
      <Tab.Screen options={{
        
        headerShown:false,
        title:'Hesap',
        tabBarIcon:({focused})=>{
          return <FontAwesome5 name='user-edit'  size={20} color={focused? '#fefae0' : 'gray' }  />
        }
      }} name='Account' component={DrawerNavigator} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  tabBarStyle:{
    backgroundColor:'#dda15e',
    borderTopColor:'rgba(0,0,0,0.1)',
    justifyContent:'center',
    alignItems:'center',
  },
})