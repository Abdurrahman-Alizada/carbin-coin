// Import React and Component
import React, {useLayoutEffect, useEffect, useRef, useState} from 'react';
import {View, StatusBar, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme, Text, Avatar, ActivityIndicator} from 'react-native-paper';
import {version} from '../../../package.json';
import {useDispatch} from 'react-redux';
import {handleCurrentLanguage} from '../../redux/reducers/settings/settings';
import i18next from '../../../locales/i18next';
import {useGetCurrentLoginUserQuery} from '../../redux/reducers/user/userThunk';
import {handleCurrentLoaginUser} from '../../redux/reducers/user/user';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  // current login user
  const id = useRef(null);
  const token = useRef(null);

  const getUserInfo = async () => {
    id.current = await AsyncStorage.getItem('userId');
    token.current = await AsyncStorage.getItem('token');
  };
  useLayoutEffect(() => {
    getUserInfo();
  }, []);

  const {
    data: user,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetCurrentLoginUserQuery(token.current);

  useEffect(() => {
    if (user) {
      dispatch(handleCurrentLoaginUser(user));
    }
  }, [user]);

  const isAppFirstLaunched = useRef(true); //onboarding screen decision
  useEffect(() => {
    const firstLaunch = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched1').then(
        value => value,
      );

      if (appData) {
        isAppFirstLaunched.current = false;
      } else {
        isAppFirstLaunched.current = true;
        await AsyncStorage.setItem('isAppFirstLaunched1', '1');
      }
    };
    firstLaunch();
  }, []);

  const [go, setGo] = useState(false);

  useEffect(() => {
    //Check if user_id is set or not If not then send for Authentication else send to Home Screen
    setTimeout(() => {
      setGo(true);
    }, 3000);
    AsyncStorage.getItem('isLoggedIn')
      .then(value => {
        if (!isLoading || go) {
          setTimeout(() => {
            isAppFirstLaunched?.current
              ? navigation.replace('Onboarding')
              : navigation.replace(!value ? 'Auth' : 'Main');
            // : navigation.replace('Main');
            // }, 2000);
          }, 0);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [isLoading, go]);

  const getCurrentLanguage = async () => {
    const lng = await AsyncStorage.getItem('currentLanguage');
    if (!lng) {
      await AsyncStorage.setItem('currentLanguage', 'en');
    } else {
      dispatch(handleCurrentLanguage(lng));
      i18next.changeLanguage(lng);
    }
  };
  useEffect(() => {
    getCurrentLanguage();
  }, []);

  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: theme.colors.blueBG,
      }}>
      <View
        style={{
          flex: 0.95,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: theme.colors.blueBG,
        }}>
        <StatusBar
          // barStyle="light-content"
          backgroundColor={theme.colors.background}
        />
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={require('../../assets/splash-screen/carib-coin-logo.png')}
        />
        <ActivityIndicator />
      </View>
      <Text style={{fontWeight: 'bold', color: theme.colors.onPrimary}}>
        V {version}
      </Text>
    </View>
  );
};

export default SplashScreen;
