import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Appbar,
  Button,
  Card,
  List,
  Menu,
  Snackbar,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import ButtonLinearGradient from '../../../../../components/ButtonLinearGradient';
const Instruction = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const [code, setCode] = useState('');

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  useEffect(() => {
    let a = generateString(32);
    let b = a.substring(1);
    a = b.match(/.{1,4}/g);
    setCode(a.join(' '));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background,
      }}>
      <View style={{}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '2%',
          }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />

          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={require('../../../../../assets/splash-screen/carib-coin-logo.png')}
            />

          </View>

          <Menu
            visible={showMenu}
            onDismiss={closeMenu}
            contentStyle={{backgroundColor: theme.colors.background}}
            anchor={
              <Appbar.Action
                icon={'dots-vertical'}
                color={theme.colors.onBackground}
                onPress={() => openMenu()}
              />
            }>
            <Menu.Item
              leadingIcon="help-circle-outline"
              title="Help"
              titleStyle={{color: theme.colors.onBackground}}
              onPress={async () => {
                closeMenu();
                // navigation.navigate('AppSettingsMain');
              }}
            />

            <Menu.Item
              leadingIcon="message-outline"
              title="Contact us"
              titleStyle={{color: theme.colors.onBackground}}
              onPress={async () => {
                closeMenu();
                // navigation.navigate('AppSettingsMain');
              }}
            />
          </Menu>
        </View>
        <Text
              style={{
                fontSize: 22,
                marginTop: '5%',
                fontWeight: '700',
                textAlign: 'center',
                paddingHorizontal: '5%',
              }}>
              {t('Instruction for setup 2FA')}
            </Text>
        <View style={{margin: '3%'}}>
          <List.Item
            title={t("We recommend downloading Authy or Google Authenticator if you don't have one installed.")}
            titleNumberOfLines={3}
            left={props => <List.Icon {...props} icon="arrow-collapse-down" />}
          />

          <List.Item
            title={t("Copy this key and paste it in your authentication app")}
            titleNumberOfLines={3}
            left={props => <List.Icon {...props} icon="key" />}
          />
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              lineHeight: 30,
              marginVertical: '5%',
              fontSize: 20,
              maxWidth: '90%',
              fontWeight: 'bold',
            }}>
            {code}
          </Text>
          <Button
            icon="content-copy"
            mode="text"
            style={{width: '70%', alignSelf: 'center'}}
            onPress={onToggleSnackBar}>
            {t("Click here to copy")}
          </Button>
          <List.Item
            title={t("Copy the key and after this is entered your authenticator app will generate a 6-digit code.")}
            titleNumberOfLines={3}
            left={props => <List.Icon {...props} icon="content-copy" />}
          />
        </View>
      </View>

<ButtonLinearGradient style={{margin: '10%'}}>

      <Button
        style={{backgroundColor:"transparent"}}
        theme={{roundness: 10}}
        contentStyle={{padding: '3%'}}
        // icon="camera"
        mode="contained"
        onPress={() => navigation.navigate('TwoFactorAuthConfirm')}>
        {t("Next")}
      </Button>
</ButtonLinearGradient>

      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={1000}>
        {t("Key copied successfully!")}
      </Snackbar>
    </View>
  );
};

export default Instruction;

const styles = StyleSheet.create({});
