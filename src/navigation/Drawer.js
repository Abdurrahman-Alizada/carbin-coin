import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Myprofile from '../screens/drawer/myProfile/Index'
import NeedHelp from '../screens/drawer/needHelp/Index'
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyProfile">
      <Stack.Screen
        name="MyProfile"
        component={Myprofile}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="NeedHelp"
        component={NeedHelp}
        // options={{headerShown: false}}
      />

    </Stack.Navigator>
  );
};

export default AppStack;
