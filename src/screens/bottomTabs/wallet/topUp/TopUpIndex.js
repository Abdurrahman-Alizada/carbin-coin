import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, Button, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
const TopUpIndex = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  return (
    <View style={{padding: '5%', flex:1, backgroundColor:theme.colors.background}}>
      <Button
        style={{marginTop: '5%'}}
        contentStyle={{
          padding: '3%',
          paddingLeft: '10%',
          alignSelf: 'flex-start',
        }}
        icon="bank"
        mode="contained-tonal"
        theme={{roundness: 2}}
        labelStyle={{fontSize: 18}}
        onPress={() => navigation.navigate('BankTransferTopUp')}>
        {t("Bank transfer")}
      </Button>
      <Button
        style={{marginTop: '5%'}}
        contentStyle={{
          padding: '3%',
          paddingLeft: '10%',
          alignSelf: 'flex-start',
        }}
        labelStyle={{fontSize: 18, alignSelf: 'flex-start'}}
        icon="credit-card"
        mode="contained-tonal"
        theme={{roundness: 2}}
        onPress={() => console.log('Pressed')}>
        {t("Card")}
      </Button>
    </View>
  );
};

export default TopUpIndex;

const styles = StyleSheet.create({});
