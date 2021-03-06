
import 'react-native-gesture-handler';
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OnBoarding from './app/screens/OnBoarding/OnBoarding';

const Stack = createStackNavigator();



function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='OnBoarding'
         component={OnBoarding} 
         options={{headerShown: false}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




export default App;
