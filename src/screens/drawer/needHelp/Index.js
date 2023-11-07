import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Appbar, Text, useTheme} from 'react-native-paper';
import ChatIndex from './Chat/index'
const Index = ({navigation}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
        <Appbar.Header style={{backgroundColor:theme.colors.background}}>
        <Appbar.BackAction onPress={navigation.goBack()} /> 
        <Appbar.Content title={"Need help"} />
        </Appbar.Header>
      <ChatIndex />
    </View>
  );
};

export default Index;
