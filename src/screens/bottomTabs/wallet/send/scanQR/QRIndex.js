import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import GenerateQR from './GenerateQR';
import Scanner from './Scanner';
const QRIndex = () => {
  const [scanOpen, setScanOpen] = useState(false);

  return (
    <View>
      {!scanOpen && <GenerateQR  />}
      <Scanner setScanOpen={setScanOpen} />
    </View>
  );
};

export default QRIndex;

const styles = StyleSheet.create({});
