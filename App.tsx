import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './src/routes'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <Routes />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})