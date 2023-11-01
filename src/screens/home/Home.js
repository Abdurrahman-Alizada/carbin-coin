import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, Appbar, useTheme} from 'react-native-paper';
import Home from './Home/index';
import Settings  from './Settings/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false
        }}
        />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
