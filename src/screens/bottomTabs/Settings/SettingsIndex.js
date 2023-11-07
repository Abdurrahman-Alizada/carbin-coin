import {ScrollView, View} from 'react-native';
import React from 'react';
import {useTheme, Text, Divider} from 'react-native-paper';
import PreferencesIndex from './preferences/index';
import HomeScreenAppbar from '../../../components/Appbars/HomeScreenAppbar';
import TopCard from './TopCard';
import CardSettingIndex from './CardSettings/CardSettingIndex';
import { useTranslation } from 'react-i18next';

const SettingsIndex = () => {
  const theme = useTheme();
  const {t} = useTranslation()
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background, paddingBottom:"5%"}}>
      <HomeScreenAppbar title={t("Settings")} />
      <ScrollView>
      <TopCard name="Abdur Rahman" date="11/22" suffix="3904" />

        <CardSettingIndex />

        <PreferencesIndex />
      </ScrollView>
    </View>
  );
};

export default SettingsIndex;
