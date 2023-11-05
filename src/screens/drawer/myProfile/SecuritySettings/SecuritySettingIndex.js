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

const SecuritySettingIndex = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{marginTop: '3%', paddingHorizontal: '0%'}}>
      <Text style={{textAlign: 'center', fontSize: 20}}>Security Settings</Text>

      <View style={{marginTop: '5%'}}>
        <Drawer.Item
          label="Verification level"
          onPress={() => navigation.navigate('Verification')}
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
          right={() => (
            <View style={{flexDirection: 'row'}}>
              <Chip
                icon="information-outline"
                mode="outlined"
                onPress={() => console.log('Pressed')}>
                Not verified
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
          label="Biometric"
          right={() => (
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          )}
        />

        <Drawer.Item
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
        />

        <Drawer.Item
          onPress={() => navigation.navigate('ChangePassword')}
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
          label="Change password"
          right={() => <List.Icon icon={'chevron-right'} style={{}} />}
        />

        <Drawer.Item
          onPress={() => navigation.navigate('TwoFactorAuth')}
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
          label="Two factor authentication"
          right={() => <List.Icon icon={'chevron-right'} style={{}} />}
        />
      </View>
    </View>
  );
};

export default SecuritySettingIndex;

const styles = StyleSheet.create({});
