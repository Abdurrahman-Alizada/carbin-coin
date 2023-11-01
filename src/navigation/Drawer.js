import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Screen1 from '../screens/drawer/Screen1';
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        // options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};

export default AppStack;
