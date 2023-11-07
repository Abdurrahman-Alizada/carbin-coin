import {ScrollView, View} from 'react-native';
import React from 'react';
import {useTheme, Text, Divider} from 'react-native-paper';
import PreferencesIndex from './preferences/index';
import HomeScreenAppbar from '../../../components/Appbars/HomeScreenAppbar';
import TopCard from './TopCard';
import CardSettingIndex from './CardSettings/CardSettingIndex';

const SettingsIndex = () => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background, paddingBottom:"5%"}}>
      <HomeScreenAppbar />
      <ScrollView>
      <TopCard name="Abdur Rahman" date="11/22" suffix="3904" />

        <CardSettingIndex />

        <PreferencesIndex />
      </ScrollView>
    </View>
  );
};

export default SettingsIndex;
