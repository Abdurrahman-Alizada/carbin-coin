import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, Button} from 'react-native-paper';
const TopUpIndex = ({navigation}) => {
  return (
    <View style={{padding: '5%'}}>
      <Button
        style={{marginTop: '5%'}}
        contentStyle={{padding: '2%',paddingLeft:"10%", alignSelf:"flex-start"}}
        icon="bank"
        mode="contained-tonal"
        theme={{roundness: 5}}
        labelStyle={{fontSize:18}}
        onPress={() => navigation.navigate("BankTransferTopUp")}>
        Bank transfer
      </Button>
      <Button
        style={{marginTop: '5%'}}
        contentStyle={{padding: '2%',paddingLeft:"10%", alignSelf:"flex-start"}}
        labelStyle={{fontSize:18, alignSelf:"flex-start"}}
        icon="bank"
        mode="contained-tonal"
        theme={{roundness: 5}}
        onPress={() => console.log('Pressed')}>
        Card
      </Button>
    
    </View>
  );
};

export default TopUpIndex;

const styles = StyleSheet.create({});
