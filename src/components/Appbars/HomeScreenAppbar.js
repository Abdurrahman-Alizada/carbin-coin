import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, Appbar, useTheme} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const HomeScreenAppbar = ({title}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <Appbar.Header style={{backgroundColor: theme.colors.background}}>
      <Appbar.Action
        icon="menu"
        color={theme.colors.onBackground}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Appbar.Content
        title={t(title)}
        titleStyle={{
          color: theme.colors.onBackground,
          alignSelf: 'center',
        }}
      />

    </Appbar.Header>
  );
};

export default HomeScreenAppbar;
