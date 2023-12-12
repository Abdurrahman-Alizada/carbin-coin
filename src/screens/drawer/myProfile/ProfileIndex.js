import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, Appbar, useTheme, Button, Snackbar} from 'react-native-paper';
import UserInfo from './userInfo/userInfoIndex';
import AdsCard from './AdsCard';
import SecuritySettingIndex from './SecuritySettings/SecuritySettingIndex';
import LinearGradient from 'react-native-linear-gradient';
import ButtonLinearGradient from '../../../components/ButtonLinearGradient';
import {useTranslation} from 'react-i18next';
import {useGetCurrentLoginUserQuery} from '../../../redux/reducers/user/userThunk';
import ProfileLoading from '../../../Skeletons/profileLoading';
import WalletIndex from '../../../Skeletons/Wallet/WalletIndex';
import {useDispatch} from 'react-redux';
import {handleCurrentLoaginUser} from '../../../redux/reducers/user/user';
import Wallet from './SecuritySettings/Wallet';
const Index = ({navigation, route}) => {
  const {token} = route?.params;
  const theme = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);


  const {
    data: user,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetCurrentLoginUserQuery(token);

  useEffect(() => {
    if (user) {
      dispatch(handleCurrentLoaginUser(user));
    }
  }, [user]);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Appbar.Header style={{backgroundColor: theme.colors.background}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={{paddingBottom: '5%'}}>
        {isLoading ? (
          <ProfileLoading />
        ) : (
          <UserInfo user={user} token={token} refetch={refetch} />
        )}

        {/* <Text style={{marginTop: '10%', textAlign: 'center', fontSize: 20}}>
          {t('Wallet information')}
        </Text>
        <Wallet setVisible={setVisible} ethereum={user?.data?.ethereum} /> */}
        {/* <AdsCard /> */}
        <Text style={{marginTop: '10%', textAlign: 'center', fontSize: 20}}>
          {t('Security settings')}
        </Text>
        {isLoading ? (
          <WalletIndex />
        ) : (
          <SecuritySettingIndex user={user} token={token} />
        )}

        <View style={{marginTop: '10%', paddingHorizontal: '5%'}}>
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

          <Button
            icon="logout"
            mode="outlined"
            style={{padding: '3%', marginTop: '3%'}}
            theme={{roundness: 10}}
            onPress={() => console.log('Pressed')}>
            {t('Log out')}
          </Button>

          <Button
            // icon="delete-outline"
            mode="text"
            textColor={theme.colors.error}
            style={{padding: '1.5%', marginTop: '3%'}}
            theme={{roundness: 10}}
            onPress={() => console.log('Pressed')}>
            {t('Delete account')}
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={1000}>
        {/* {t('Key copied successfully!')} */}
        Key copied successfully!
      </Snackbar>
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
