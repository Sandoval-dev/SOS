import { Settings, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Account from '../screens/Account'


const Tab=createBottomTabNavigator()
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Account' component={Account} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})