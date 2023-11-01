import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import HomeScreenAppbar from '../../../components/Appbars/HomeScreenAppbar';
const Index = () => {
  return (
    <View>
      <HomeScreenAppbar />
      <Text>Index Saving</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
