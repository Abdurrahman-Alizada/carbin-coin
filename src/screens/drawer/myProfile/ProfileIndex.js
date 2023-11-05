import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {Text, Appbar, useTheme, Button} from 'react-native-paper';
import UserInfo from './userInfo/userInfoIndex';
import AdsCard from './AdsCard';
import SecuritySettingIndex from './SecuritySettings/SecuritySettingIndex';
const Index = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: theme.colors.background}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{paddingBottom: '5%'}}>
        <UserInfo />
        <AdsCard />
        <SecuritySettingIndex />

        <View style={{marginTop: '10%', paddingHorizontal: '5%'}}>
          <Button
            icon="message-processing"
            mode="contained"
            style={{padding: '1.5%'}}
            theme={{roundness: 10}}
            onPress={() => console.log('Pressed')}>
            Need help
          </Button>
   
          <Button
            icon="logout"
            mode="outlined"
            style={{padding: '1.5%', marginTop:"3%"}}
            theme={{roundness: 10}}
            onPress={() => console.log('Pressed')}>
            Log out
          </Button>
   
          <Button
            // icon="delete-outline"
            mode="text"
            textColor={theme.colors.error}
            style={{padding: '1.5%', marginTop:"3%"}}
            theme={{roundness: 10}}
            onPress={() => console.log('Pressed')}>
            Delete account
          </Button>

        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
