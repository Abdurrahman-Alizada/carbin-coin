// Import React and Component
import React, {useLayoutEffect, useEffect, useRef} from 'react';
import {View, StatusBar, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme, Text, Avatar} from 'react-native-paper';
import {version} from '../../../package.json';
import {useDispatch} from 'react-redux';
import {handleCurrentLanguage} from '../../redux/reducers/settings/settings';
import i18next from '../../../locales/i18next';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    //Check if user_id is set or not If not then send for Authentication else send to Home Screen

    AsyncStorage.getItem('isLoggedIn')
      .then(value => {
        setTimeout(() => {
          isAppFirstLaunched?.current
            ? navigation.replace('Onboarding')
            : // : navigation.replace(!value ? 'Auth' : 'Drawer');
              navigation.replace('Main');
          // }, 2000);
        }, 0);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
      </View>
      <Text style={{fontWeight: 'bold', color: theme.colors.onPrimary}}>
        V {version}
      </Text>
    </View>
  );
};

export default SplashScreen;
