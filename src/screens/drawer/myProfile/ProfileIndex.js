import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {Text, Appbar, useTheme, Button} from 'react-native-paper';
import UserInfo from './userInfo/userInfoIndex';
import AdsCard from './AdsCard';
import SecuritySettingIndex from './SecuritySettings/SecuritySettingIndex';
import LinearGradient from 'react-native-linear-gradient';
import ButtonLinearGradient from '../../../components/ButtonLinearGradient';
import {useTranslation} from 'react-i18next';
const Index = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Appbar.Header style={{backgroundColor: theme.colors.background}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{paddingBottom: '5%'}}>
        <UserInfo />
        {/* <AdsCard /> */}
        <SecuritySettingIndex />

        <View style={{marginTop: '10%', paddingHorizontal: '5%'}}>
          {/* <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{borderRadius: 40, height: 'auto'}}> */}
          <ButtonLinearGradient>
            <Button
              icon="message-processing"
              mode="contained"
              style={{
                backgroundColor: 'transparent',
                height: 'auto',
              }}
              contentStyle={{
                padding: '3%',
              }}
              theme={{roundness: 10}}
              labelStyle={{color: theme.colors.surface}}
              onPress={() => {
                // navigation.navigate('NeedHelp');
              }}>
              {t('Need help')}
            </Button>
          </ButtonLinearGradient>

          {/* </LinearGradient> */}

          <Button
            icon="logout"
            mode="outlined"
            style={{padding: '3%', marginTop: '3%'}}
            theme={{roundness: 10}}
            onPress={() => console.log('Pressed')}>
            {t("Log out")}
          </Button>

          <Button
            // icon="delete-outline"
            mode="text"
            textColor={theme.colors.error}
            style={{padding: '1.5%', marginTop: '3%'}}
            theme={{roundness: 10}}
            onPress={() => console.log('Pressed')}>
            {t("Delete account")}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  linearGradient: {
    // flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
