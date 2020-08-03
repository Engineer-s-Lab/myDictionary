import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider as MainProvider} from './src/context/MainContext'
import BookScreen from './src/screens/BookScreen'
import WordScreen from './src/screens/WordScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='BookScreen' component={BookScreen}/>
        <Stack.Screen name='WordScreen' component={WordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () =>{
  return(
    <MainProvider>
      <App/>
    </MainProvider>
  )
}