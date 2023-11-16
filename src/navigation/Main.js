import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from '../components/DrawerContent';
import BottomTabStack from './bottomTabsStack';
import Drawer from './Drawer'
const Drawer1 = createDrawerNavigator();

const DrawerStack = props => {
  return (
    <Drawer1.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer1.Screen
        options={{headerShown: false}}
        name="BottomTabStack"
        component={BottomTabStack}
      />
      <Drawer1.Screen
        name="Drawer"
        component={Drawer}
        options={{headerShown: false}}
      />
    </Drawer1.Navigator>
  );
};

export default DrawerStack;
