import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Loading from '../screens/Loading'
import TabNavigator from './TabNavigator'
import Login from '../screens/Login'
import Register from '../screens/Register'



const Stack = createStackNavigator()
const Routes = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name='Welcome' component={TabNavigator} options={{ title: 'Welcome' }} />
                <Stack.Screen name='Loading' component={Loading} />
                <Stack.Screen name='Login' component={Login} options={{ title: 'Login' }} />
                <Stack.Screen name='Register' component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes