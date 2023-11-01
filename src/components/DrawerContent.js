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
// import {useGetCurrentLoginUserQuery} from '../redux/reducers/user/userThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
// import {handleCurrentLoaginUser} from '../redux/reducers/user/user';
// import {userApi} from '../redux/reducers/user/userThunk';
// import {groupApi} from '../redux/reducers/groups/groupThunk';
// import {friendshipApi} from '../redux/reducers/Friendship/friendshipThunk';

import {version} from '../../package.json';

export default function DrawerContent(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();

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
      'https://eventplannerapp.netlify.app/privacy-policy',
    );

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(
        'https://eventplannerapp.netlify.app/privacy-policy',
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
        <Drawer.Item
          label="Screen 1"
          onPress={() => {
            navigation.navigate('Drawer', {
              sreen: 'Screen1',
              refreshTimeStamp: new Date().toISOString(),
            });
          }}
          icon="account-multiple"
        />
        <Drawer.Item
          label="Screen 2"
          // onPress={() => {
          //   navigation.navigate('MakeFriends', {screen: 'MakeFriendsMain'});
          // }}
          icon="account-multiple"
        />
      </View>
      <View style={{marginVertical: '5%'}}>
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
      </View>
    </DrawerContentScrollView>
  );
}
