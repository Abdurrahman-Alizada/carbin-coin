import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Card, Switch, Text, useTheme} from 'react-native-paper';
const TwoFactorAuthIndex = ({navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    navigation.navigate('TwoFactorAuthInstruction');
  };

  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <View
        style={{
          marginTop: '10%',
          padding: '3%',
        }}>
        <Text style={{fontSize: 16, textAlign: 'center'}}>
          Protect your account from unauthorized activity by setting up a second
          authentication method. This is in addition to your main Caribbean
          password and only requested when performing sensitive actions from
          within our app.
        </Text>
        <Card mode="elevated" style={{marginTop: '10%'}}>
          <Card.Content
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                }}
                source={require('../../../../../assets/splash-screen/carib-coin-logo.png')}
              />
              <Text variant="titleSmall" style={{marginLeft: '3%'}}>
                Authenticator
              </Text>
            </View>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default TwoFactorAuthIndex;

const styles = StyleSheet.create({});
