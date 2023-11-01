import {StyleSheet, View} from 'react-native';
import React from 'react';
import Settings from './Settings/index';
import Wallet from './wallet/Index';
import Invest from './invest/Index';
import Savings from './savings/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';
const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      // activeColor="#e91e63"
      barStyle={{backgroundColor: theme.colors.surface}}>
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="wallet" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Savings"
        component={Savings}
        options={{
          tabBarLabel: 'Savings',
          tabBarIcon: ({color}) => (
            <FontAwesome6Icon name="money-bill-wave" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Invest"
        component={Invest}
        options={{
          tabBarLabel: 'Invest',
          tabBarIcon: ({color}) => (
            <FontAwesome6Icon name="money-bill-trend-up" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
