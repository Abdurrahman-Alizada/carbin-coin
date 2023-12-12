import React, {useEffect, useRef, useState} from 'react';
import {View, Linking, Alert} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  Avatar,
  Drawer,
  List,
  useTheme,
  Text,
  Divider,
  Chip,
} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {version} from '../../package.json';
import {useTranslation} from 'react-i18next';
import {
  useGetCurrentLoginUserQuery,
  useUpdateWalletInfoOfUserMutation,
} from '../redux/reducers/user/userThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleCurrentLoaginUser} from '../redux/reducers/user/user';

import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';

export default function DrawerContent(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const {t} = useTranslation();
  const id = useRef(null);
  const token = useRef(null);

  const KYCStatusText = useSelector(state => state.user.KYCStatusText);
  const KYCStatusIcon = useSelector(state => state.user.KYCStatusIcon);
  const isKYCVerified = useSelector(state => state.user.isKYCVerified);

  const getUserInfo = async () => {
    id.current = await AsyncStorage.getItem('userId');
    token.current = await AsyncStorage.getItem('token');
    // console.log("id=>",id.current,"token=>", token.current);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const {
    data: user,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetCurrentLoginUserQuery(token.current);

  const obscureEmail = email => {
    if (!email) return '*******';
    const [name, domain] = email?.split('@');
    return `${name[0]}${name[1]}${new Array(8).join('*')}@${domain}`;
  };

  // privacy policy
  const handlePrivacyPolicyPress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL('https://google.com');

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL('https://google.com');
    } else {
      Alert.alert(`Something went wrong`);
    }
  };

  const logout = async () => {
    await AsyncStorage.setItem('isLoggedIn', '');
    await AsyncStorage.setItem('id', '');
    await AsyncStorage.setItem('token', '');
    await AsyncStorage.setItem('userId', '');
    await AsyncStorage.setItem('name', '');
    await AsyncStorage.setItem('ImageURL', '');
    dispatch(handleCurrentLoaginUser({}));
    // dispatch(userApi.util.resetApiState())
    // dispatch(groupApi.util.resetApiState());
    // dispatch(friendshipApi.util.resetApiState())
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('Auth');
  };

  useEffect(() => {
    if (user?.data) {
      dispatch(handleCurrentLoaginUser(user));
    }
  }, [user]);

  // wallet
  const {isOpen, open, close, provider, isConnected, address} =
    useWalletConnectModal();
  const projectId = '4287ee7f1533e4a2b7f5d0937ba341cf';

  const providerMetadata = {
    name: 'caribbean-coin',
    description: 'Caribbean coin project',
    url: 'https://app.caribbean-coin.com/',
    icons: ['https://app.caribbean-coin.com/carib-coin-logo.png'],
    redirect: {
      native: 'YOUR_APP_SCHEME://',
      universal: 'YOUR_APP_UNIVERSAL_LINK.com',
    },
  };

  // Function to handle the
  // console.log('first', isOpen, isConnected, address);
  const handleButtonPress = async () => {
    DrawerActions.closeDrawer();
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  const [
    updateWalletInfoOfUser,
    {isLoading: isWalletLoading, isError: isWalletError, error: walletError},
  ] = useUpdateWalletInfoOfUserMutation();

  const handleUpdateWalletInfoOfUser = async () => {
    const ethereum = {
      isWallet: true,
      walletAddress: address,
    };
    updateWalletInfoOfUser({
      userId: user?.data?._id,
      ethereum: ethereum,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (address) {
      handleUpdateWalletInfoOfUser();
    }
  }, [address]);
  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: theme.colors.background}}
      contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{marginVertical: '5%'}}>
        {isLoading ? (
          <List.Item
            title={props => (
              <SkeletonPlaceholder borderRadius={4} {...props}>
                <SkeletonPlaceholder.Item width="60%" height={15} />
                <SkeletonPlaceholder.Item
                  marginTop={7}
                  width="30%"
                  height={12}
                />
              </SkeletonPlaceholder>
            )}
            left={props => (
              <SkeletonPlaceholder borderRadius={4} {...props}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="flex-start">
                  <SkeletonPlaceholder.Item
                    width={50}
                    marginLeft={20}
                    height={50}
                    borderRadius={50}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            )}
          />
        ) : (
          <View>
            <List.Item
              title={user?.data?.name ? user?.data?.name : 'Nick name'}
              // onPress={async () => {
              //   navigation.navigate('Drawer', {
              //     screen: 'Profile',
              //     params: {token: token.current},
              //   });
              // }}
              // left={props =>
              //   user?.data?.imageURL ? (
              //     <Avatar.Image
              //       {...props}
              //       source={
              //         user?.imageURL
              //           ? {uri: user?.imageURL}
              //           : require('../assets/splash-screen/carib-coin-logo.png')
              //       }
              //       size={50}
              //     />
              //   ) : (
              //     <Avatar.Icon
              //       {...props}
              //       icon="account"
              //       size={50}
              //       // style={{backgroundColor: theme.colors.background}}
              //     />
              //   )
              // }
              description={() => (
                <Text> {obscureEmail(user?.data?.email)}</Text>
              )}
              style={{marginLeft: '8%'}}
            />
            <Chip
              icon={KYCStatusIcon}
              mode="outlined"
              style={{
                marginTop: '2%',
                borderRadius: 12,
                alignSelf: 'flex-start',
                marginLeft: '12%',
              }}
              onPress={() => console.log('Pressed')}>
              {t(KYCStatusText)}
            </Chip>
          </View>
        )}

        <Divider style={{marginVertical: '5%'}} />
        <Drawer.Item
          label={t('My Profile')}
          onPress={() => {
            navigation.navigate('Drawer', {
              screen: 'Profile',
              params: {token: token.current},
            });
          }}
          icon="account"
        />
        {!isConnected && (
          <Drawer.Item
            label={isConnected ? t('Disconnect wallet') : t('Connect wallet')}
            onPress={handleButtonPress}
            icon={isConnected ? 'window-close' : 'wallet'}
          />
        )}
        <Drawer.Item
          label={t('Cards')}
          onPress={() => {
            navigation.navigate('Drawer', {
              screen: 'Cards',
            });
          }}
          icon="credit-card"
        />
        <Drawer.Item
          label={t('Invitation code')}
          onPress={() => {
            navigation.navigate('Drawer', {
              screen: 'ReferralSystem',
            });
          }}
          icon="account-child-outline"
        />
        <Drawer.Item
          label={t('Need Help')}
          onPress={() => {
            navigation.navigate('NeedHelp');
          }}
          icon="chat-alert-outline"
        />
        <Drawer.Item
          label={t('Log out')}
          onPress={() => {
            logout();
          }}
          icon="logout"
        />
      </View>

      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />

      {/* <View style={{marginVertical: '5%'}}>
        <Divider />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => handlePrivacyPolicyPress()}
            style={{alignSelf: 'center', margin: '5%'}}>
            <Text>Privacy policy</Text>
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              marginBottom: 6,
              fontSize: 20,
            }}>
            .
          </Text>
          <Text style={{alignSelf: 'center', margin: '5%'}}>V {version}</Text>
        </View>
      </View> */}
    </DrawerContentScrollView>
  );
}
