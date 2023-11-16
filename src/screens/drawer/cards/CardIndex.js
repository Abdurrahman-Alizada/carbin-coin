import {View} from 'react-native';
import React from 'react';
import {Appbar, Text, useTheme} from 'react-native-paper';
import NoCard from './Nocard';

const CardIndex = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Appbar.Header style={{backgroundColor: theme.colors.background}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Cards'} />
      </Appbar.Header>

      <NoCard />
    </View>
  );
};

export default CardIndex;
