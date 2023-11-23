import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Appbar, Text, useTheme} from 'react-native-paper';
import GenerateQR from './GenerateQR';
import Scanner from './Scanner';
import {useNavigation} from '@react-navigation/native';
const QRIndex = () => {
  const navigation = useNavigation();
  const [scanOpen, setScanOpen] = useState(false);
  const theme = useTheme();
  return (
    <View style={{justifyContent: 'space-between'}}>
      <Appbar.Header style={{backgroundColor: '#FFFBFF'}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Text variant="titleLarge">QR code</Text>
      </Appbar.Header>

      {!scanOpen && <GenerateQR />}

      <Scanner setScanOpen={setScanOpen} />
    </View>
  );
};

export default QRIndex;

const styles = StyleSheet.create({});
