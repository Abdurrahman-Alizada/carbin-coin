import {StyleSheet, View} from 'react-native';
import React from 'react';
import Settings from './Settings/SettingsIndex';
import Wallet from './wallet/Index';
import Invest from './invest/Index';
import Savings from './savings/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: theme.colors.surface,
      }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurface}>
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: t('Wallet'),
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="wallet" color={color} size={26} />
          ),
        }}
        styles
      />

      <Tab.Screen
        name="Savings"
        component={Savings}
        options={{
          tabBarLabel: t('Savings'),
          tabBarIcon: ({color}) => (
            <FontAwesome6Icon name="money-bill-wave" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Invest"
        component={Invest}
        options={{
          tabBarLabel: t('Invest'),
          tabBarIcon: ({color}) => (
            <FontAwesome6Icon
              name="money-bill-trend-up"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: t('Settings'),
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
