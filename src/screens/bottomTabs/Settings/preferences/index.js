import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import HomeScreenAppbar from '../../../../components/Appbars/HomeScreenAppbar';
import {List, Switch, Text, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../../../themeContext';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = useContext(ThemeContext);

  return (
    <View style={{paddingHorizontal: '2%'}}>
      <List.Section>
        <List.Subheader style={{}}>{t('Preferences')}</List.Subheader>

        <List.Item
          title={t('Choose language')}
          onPress={() => {
            navigation.navigate('ChooseLanguage');
          }}
          left={props => <List.Icon {...props} icon="transition-masked" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />

        <List.Item
          title={t('Dark theme')}
          onPress={() => {
            toggleTheme();
          }}
          left={props => <List.Icon {...props} icon="weather-night" />}
          right={props => (
            <Switch
              {...props}
              value={isThemeDark}
              onValueChange={() => toggleTheme()}
            />
          )}
        />
      </List.Section>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
