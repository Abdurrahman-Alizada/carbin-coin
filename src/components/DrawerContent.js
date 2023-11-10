import React, {useEffect, useState, useContext, useRef} from 'react';
import {View, Linking, Alert, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Drawer,
  List,
  useTheme,
  Text,
  Divider,
} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import {version} from '../../package.json';
import { useTranslation } from 'react-i18next';

export default function DrawerContent(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const {t} = useTranslation();

  const obscureEmail = email => {
    if (!email) return '*******';
    const [name, domain] = email?.split('@');
    return `${name[0]}${name[1]}${new Array(name.length - 3).join(
      '*',
    )}@${domain}`;
  };

  // privacy policy
  const handlePrivacyPolicyPress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(
      'https://google.com',
    );

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(
        'https://google.com',
      );
    } else {
      Alert.alert(`Something went wrong`);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: theme.colors.background}}
      contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{marginVertical: '5%'}}>
        
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
        <Drawer.Item
          label={t("My Profile")}
          onPress={() => {
            navigation.navigate('Drawer', {
              screen: 'Profile',
            })
           }}
          icon="account"
        />
          <Drawer.Item
          label={t("Cards")}
          onPress={() => {
            navigation.navigate('Drawer', {
              screen: 'Cards',
            })
           }}
          icon="credit-card"
        />
        <Drawer.Item
          label={t("Need Help")}
          onPress={() => {
            navigation.navigate('NeedHelp')
           }}
          icon="chat-alert-outline"
        />
           <Drawer.Item
          label={t("Log out")}
          // onPress={() => {
          //   navigation.navigate('MakeFriends', {screen: 'MakeFriendsMain'});
          // }}
          icon="logout"
        />
      </View>
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
