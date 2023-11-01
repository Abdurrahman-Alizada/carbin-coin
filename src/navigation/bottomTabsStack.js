import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Tabs from '../screens/bottomTabs/Index';
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="GroupBrief"
        component={Groupbrief}
        options={{
          title: 'Group brief',
          headerShown:false
          // header: props => <GeneralAppbar title="Group brief" {...props} />,
        }}
      /> */}


    </Stack.Navigator>
  );
};

export default AppStack;
