import {StyleSheet, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  Card,
  Text,
  Appbar,
  Menu,
  Button,
  List,
  useTheme,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import ButtonLinearGradient from '../../../../../components/ButtonLinearGradient';

const UsingLinkInstruction = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingRight: '2%',
        }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />

        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{
              width: 70,
              height: 70,
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

      <ScrollView
        style={{
          padding: '2%',
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: '2%',
            textAlign: 'center',
            paddingHorizontal: '5%',
          }}>
          {t('Send money using a link')}
        </Text>
        <Text
          style={{
            //   fontSize: 20,
            marginBottom: '4%',
            textAlign: 'center',
            paddingHorizontal: '5%',
          }}>
          {t('Free and intant to anyone in the world')}
        </Text>

        <Card mode="outlined" style={{marginTop: '0%'}}>
          <Text
            style={{textAlign: 'center', marginTop: '4%', fontWeight: '900'}}>
            {t('You')}:
          </Text>
          <Card.Content>
            <List.Item
              title={t('Digital cash accounts')}
              titleNumberOfLines={2}
              left={props => <List.Icon {...props} icon="check" />}
            />
            <List.Item
              titleNumberOfLines={2}
              title={t(
                'Select a caribbean-coin account the amount you want to send.',
              )}
              left={props => <List.Icon {...props} icon="check" />}
            />
            <List.Item
              titleNumberOfLines={2}
              title={t(
                'Send the link via email or and share through your choice of messenger',
              )}
              left={props => <List.Icon {...props} icon="check" />}
            />
            <List.Item
              left={props => <List.Icon {...props} icon="check" />}
              titleNumberOfLines={2}
              title={t('Share a security code if aplicable')}
            />
          </Card.Content>
        </Card>

        <Card mode="outlined" style={{marginTop: '3%'}}>
          <Text
            style={{textAlign: 'center', marginTop: '4%', fontWeight: '900'}}>
            {t('Receipent')}:
          </Text>
          <Card.Content>
            <List.Item
              titleNumberOfLines={2}
              title={t('Digital cash accounts')}
              left={props => <List.Icon {...props} icon="check" />}
            />
            <List.Item
              title={t('Follow the link.')}
              titleNumberOfLines={2}
              left={props => <List.Icon {...props} icon="check" />}
            />
            <List.Item
              title={t('Log in or register for Caribbean-coin')}
              titleNumberOfLines={2}
              left={props => <List.Icon {...props} icon="check" />}
            />
            <List.Item
              title={t('Enter a security code if applicable.')}
              titleNumberOfLines={2}
              left={props => <List.Icon {...props} icon="check" />}
            />
          </Card.Content>
        </Card>

        <ButtonLinearGradient style={{marginVertical: '3%'}}>
          <Button
            mode="contained"
            style={{width: '100%', backgroundColor: 'transparent'}}
            theme={{roundness: 15}}
            contentStyle={{padding: '2%'}}
            onPress={() => {
              navigation.navigate('SendUsingLink');
            }}>
            {t("Let's go")}
          </Button>
        </ButtonLinearGradient>
      </ScrollView>
    </View>
  );
};

export default UsingLinkInstruction;

const styles = StyleSheet.create({});
