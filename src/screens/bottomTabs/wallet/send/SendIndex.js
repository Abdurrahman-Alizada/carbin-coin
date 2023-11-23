import {StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import {Text, Button, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const SendIndex = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View
      style={{
        padding: '5%',
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      {isLoading ? (
        <View><Text>hello</Text></View>
      ) : (
        <View style={{flex: 1}}>
          <Text
            style={{
              marginTop: '4%',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            {t('You are sending money to')}...
          </Text>
          <Button
            style={{marginTop: '5%'}}
            contentStyle={{
              padding: '3%',
              paddingLeft: '10%',
              alignSelf: 'flex-start',
            }}
            icon="account-tie"
            mode="contained-tonal"
            theme={{roundness: 2}}
            labelStyle={{fontSize: 18}}
            onPress={() => navigation.navigate('SendMoneyToCaribbeanUser')}>
            {t('To a Caribbean-coin user')}
          </Button>
          <Button
            style={{marginTop: '5%'}}
            contentStyle={{
              padding: '3%',
              paddingLeft: '10%',
              alignSelf: 'flex-start',
            }}
            icon="account"
            mode="contained-tonal"
            theme={{roundness: 2}}
            labelStyle={{fontSize: 18}}
            onPress={() => navigation.navigate('ToContact')}>
            {t('Contact')}
          </Button>
          <Button
            style={{marginTop: '5%'}}
            contentStyle={{
              padding: '3%',
              paddingLeft: '10%',
              alignSelf: 'flex-start',
            }}
            labelStyle={{fontSize: 18, alignSelf: 'flex-start'}}
            icon="link"
            mode="contained-tonal"
            theme={{roundness: 2}}
            onPress={() => navigation.navigate('SendUsingLinkInstruction')}>
            {t('Using a link')}
          </Button>

          <Button
            style={{marginTop: '5%'}}
            contentStyle={{
              padding: '3%',
              paddingLeft: '10%',
              alignSelf: 'flex-start',
            }}
            labelStyle={{fontSize: 18, alignSelf: 'flex-start'}}
            icon="line-scan"
            mode="contained-tonal"
            theme={{roundness: 2}}
            onPress={() => navigation.navigate('QRScan')}>
            {t('QR code')}
          </Button>
        </View>
      )}
    </View>
  );
};

export default SendIndex;

const styles = StyleSheet.create({});
