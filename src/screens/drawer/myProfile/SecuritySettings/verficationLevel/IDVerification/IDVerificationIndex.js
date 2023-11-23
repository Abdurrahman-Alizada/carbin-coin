import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ButtonLinearGradient from '../../../../../../components/ButtonLinearGradient';

const IDVerificationIndex = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();
  const selectedCountry = useSelector(state => state.user.selectedCountry);

  const onOpen = () => {
    navigation.navigate('CountriesList');
  };
  return (
    <View style={{flexGrow: 1, justifyContent: 'space-between'}}>
      <View style={{alignItems: 'center', width: '100%'}}>
        <Image
          style={{
            marginTop: '5%',
            width: 50,
            height: 50,
          }}
          source={require('../../../../../../assets/splash-screen/carib-coin-logo.png')}
        />
        <Text
          style={{
            fontSize: 22,
            marginVertical: '2%',
            textAlign: 'center',
            paddingHorizontal: '5%',
          }}>
          {t('Your country')}
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            paddingHorizontal: '5%',
          }}>
          {t(
            "Select your country of residence and we'll tell you what kind of services are already available.",
          )}
        </Text>

        <TextInput
          style={{
            marginTop: '10%',
            backgroundColor: theme.colors.background,
            width: '90%',
          }}
          label={t('Country of residence')}
          value={selectedCountry?.name}
          // onChangeText={(e)=>setCountry(e)}
          onFocus={onOpen}
          onTouchStart={onOpen}
          right={<TextInput.Icon icon="chevron-down" onPress={onOpen} />}
          showSoftInputOnFocus={false}
        />
      </View>

      <ButtonLinearGradient style={{margin: '8%'}}>
        <Button
          style={{backgroundColor: 'transparent'}}
          theme={{roundness: 10}}
          contentStyle={{padding: '3%'}}
          mode="contained"
          // onPress={() => navigation.navigate('TwoFactorAuthConfirm')}
        >
          {t('Next')}
        </Button>
      </ButtonLinearGradient>
    </View>
  );
};

export default IDVerificationIndex;
