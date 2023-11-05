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

const UsingLinkInstruction = ({navigation}) => {
  const theme = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  return (
    <ScrollView style={{padding: '2%'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingRight: '2%',
          marginBottom: '5%',
        }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />

        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{
              width: 80,
              height: 80,
            }}
            source={require('../../../../../assets/splash-screen/carib-coin-logo.png')}
          />
          <Text
            style={{
              fontSize: 20,
              marginTop: '2%',
              textAlign: 'center',
              paddingHorizontal: '5%',
            }}>
            Send money using a link
          </Text>
          <Text
            style={{
              //   fontSize: 20,
              marginTop: '2%',
              textAlign: 'center',
              paddingHorizontal: '5%',
            }}>
            Free and intant to anyone in the world
          </Text>
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

      <Card mode="outlined" style={{marginTop: '0%'}}>
        <Text style={{textAlign: 'center', marginTop: '4%', fontWeight: '900'}}>
          You:
        </Text>
        <Card.Content>
          <List.Item
            title="Digital cash accounts"
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="check" />}
          />
          <List.Item
            titleNumberOfLines={2}
            title="Select a caribbean-coin account the amount you want to send."
            left={props => <List.Icon {...props} icon="check" />}
          />
          <List.Item
            titleNumberOfLines={2}
            title="Send the link via email or and share through your choice of messenger"
            left={props => <List.Icon {...props} icon="check" />}
          />
          <List.Item
            left={props => <List.Icon {...props} icon="check" />}
            titleNumberOfLines={2}
            title="Share a security code if aplicable"
          />
        </Card.Content>
      </Card>

      <Card mode="outlined" style={{marginTop: '3%'}}>
        <Text style={{textAlign: 'center', marginTop: '4%', fontWeight: '900'}}>
          Receipent:
        </Text>
        <Card.Content>
          <List.Item
            titleNumberOfLines={2}
            title="Digital cash accounts"
            left={props => <List.Icon {...props} icon="check" />}
          />
          <List.Item
            title="Follow the link."
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="check" />}
          />
          <List.Item
            title="Log in or register for Caribbean-coin"
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="check" />}
          />
          <List.Item
            title="Enter a security code if applicable."
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="check" />}
          />
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={{width: '100%', marginVertical: '3%'}}
        theme={{roundness: 15}}
        contentStyle={{padding: '2%'}}
        onPress={() => {
          navigation.navigate('SendUsingLink');
        }}>
        Let's go
      </Button>
    </ScrollView>
  );
};

export default UsingLinkInstruction;

const styles = StyleSheet.create({});
