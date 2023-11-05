import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Text, Button, Avatar, useTheme} from 'react-native-paper';

const SendIndex = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={{padding: '5%', flex: 1}}>
      <Text
        style={{
          marginTop: '4%',
          fontSize: 18,
          textAlign: 'center',
          fontWeight: '600',
        }}>
        You are sending money to...
      </Text>
      <Button
        style={{marginTop: '5%'}}
        contentStyle={{
          padding: '2%',
          paddingLeft: '10%',
          alignSelf: 'flex-start',
        }}
        icon="account-tie"
        mode="contained-tonal"
        theme={{roundness: 5}}
        labelStyle={{fontSize: 18}}
        onPress={() => navigation.navigate('SendMoneyToCaribbeanUser')}>
        To a Caribbean-coin user
      </Button>
      <Button
        style={{marginTop: '5%'}}
        contentStyle={{
          padding: '2%',
          paddingLeft: '10%',
          alignSelf: 'flex-start',
        }}
        icon="account-tie"
        mode="contained-tonal"
        theme={{roundness: 5}}
        labelStyle={{fontSize: 18}}
        onPress={() => navigation.navigate('ToContact')}>
        Contact
      </Button>
      <Button
        style={{marginTop: '5%'}}
        contentStyle={{
          padding: '2%',
          paddingLeft: '10%',
          alignSelf: 'flex-start',
        }}
        labelStyle={{fontSize: 18, alignSelf: 'flex-start'}}
        icon="link"
        mode="contained-tonal"
        theme={{roundness: 5}}
        onPress={() => navigation.navigate('SendUsingLinkInstruction')}>
        Using a link
      </Button>

      <Button
        style={{marginTop: '5%'}}
        contentStyle={{
          padding: '2%',
          paddingLeft: '10%',
          alignSelf: 'flex-start',
        }}
        labelStyle={{fontSize: 18, alignSelf: 'flex-start'}}
        icon="link"
        mode="contained-tonal"
        theme={{roundness: 5}}
        onPress={() => navigation.navigate('QRScan')}>
        Scan QR code
      </Button>
    </View>
  );
};

export default SendIndex;

const styles = StyleSheet.create({});
