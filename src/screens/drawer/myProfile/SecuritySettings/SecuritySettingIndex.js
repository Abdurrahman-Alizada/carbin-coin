import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {
  Text,
  List,
  useTheme,
  Switch,
  Chip,
  Drawer,
  Avatar,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const SecuritySettingIndex = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const KYCStatusText = useSelector(state => state.user.KYCStatusText);
  const KYCStatusIcon = useSelector(state => state.user.KYCStatusIcon);
  const isKYCVerified = useSelector(state => state.user.isKYCVerified);


  return (
    <View style={{paddingHorizontal: '0%'}}>
      <View style={{marginTop: '5%'}}>
        <Drawer.Item
          label={t('Verification level')}
          onPress={() => navigation.navigate('Verification')}
          icon={() => (
            <View
              style={{
                padding: 4,
                backgroundColor: theme.colors.secondaryContainer,
                borderRadius: 25,
              }}>
              <Icon
                name="verified-user"
                size={25}
                color={theme.colors.onBackground}
              />
            </View>
          )}
          right={() => (
            <View style={{flexDirection: 'row'}}>
              <Chip
                icon={KYCStatusIcon}
                mode="outlined"
                style={{
                  marginTop: '2%',
                  borderRadius: 12,
                  alignSelf: 'flex-start',
                }}
                onPress={() => console.log('Pressed')}>
                {t(KYCStatusText)}
              </Chip>
              <List.Icon icon={'chevron-right'} style={{}} />
            </View>
          )}
        />

        <Drawer.Item
          style={{marginTop: '2%'}}
          icon={() => (
            <View
              style={{
                padding: 4,
                backgroundColor: theme.colors.secondaryContainer,
                borderRadius: 25,
              }}>
              <IonicIcon
                name="thumbs-up"
                size={25}
                color={theme.colors.onBackground}
              />
              {/* <Image
                style={{
                  width: 25,
                  height: 25,
                }}
                source={require('../../../../assets/splash-screen/carib-coin-logo.png')}
              /> */}
            </View>
          )}
          label={t('Biometric')}
          right={() => (
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          )}
        />

        {/* <Drawer.Item
          style={{marginTop: '2%'}}
          icon={() => (
            <View
              style={{
                padding: 4,
                backgroundColor: theme.colors.errorContainer,
                borderRadius: 15,
              }}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                }}
                source={require('../../../../assets/splash-screen/carib-coin-logo.png')}
              />
            </View>
          )}
          label="Change pin code"
          right={() => <List.Icon icon={'chevron-right'} style={{}} />}
        /> */}

        <Drawer.Item
          onPress={() => navigation.navigate('ChangePassword')}
          style={{marginTop: '2%'}}
          icon={() => (
            <View
              style={{
                padding: 4,
                backgroundColor: theme.colors.primaryContainer,
                borderRadius: 25,
              }}>
              <Icon
                name="password"
                size={25}
                color={theme.colors.onBackground}
              />
            </View>
          )}
          label={t('Change password')}
          right={() => <List.Icon icon={'chevron-right'} style={{}} />}
        />

        <Drawer.Item
          onPress={() => navigation.navigate('TwoFactorAuth')}
          style={{marginTop: '2%'}}
          icon={() => (
            <View
              style={{
                padding: 4,
                backgroundColor: theme.colors.secondaryContainer,
                borderRadius: 25,
              }}>
              <MaterialCommunityIcon
                name="two-factor-authentication"
                size={25}
                color={theme.colors.onBackground}
              />
            </View>
          )}
          label={t('Two factor authentication')}
          right={() => <List.Icon icon={'chevron-right'} style={{}} />}
        />
      </View>
    </View>
  );
};

export default SecuritySettingIndex;
