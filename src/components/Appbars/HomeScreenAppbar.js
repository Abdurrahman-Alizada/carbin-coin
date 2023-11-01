import { StyleSheet, View } from 'react-native'
import React from 'react'
import {Text, Appbar, useTheme} from 'react-native-paper';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const HomeScreenAppbar = () => {
    const theme = useTheme();
    const navigation = useNavigation();
  
    return (
    <Appbar.Header
    style={{backgroundColor: theme.colors.background}}
    elevated={true}>
    <Appbar.Action
      icon="menu"
      color={theme.colors.onBackground}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
    {/* <Appbar.Content
        title="Event Planner"
        titleStyle={{
          color: theme.colors.onBackground,
        }}
      /> */}

    {/* <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={{backgroundColor: theme.colors.background}}
        anchor={
          <Appbar.Action
            icon={MORE_ICON}
            color={theme.colors.onBackground}
            onPress={() => openMenu()}
          />
        }>
        <Menu.Item
          leadingIcon="cog-outline"
          title="Settings"
          titleStyle={{color: theme.colors.onBackground}}
          onPress={async () => {
            closeMenu();
            navigation.navigate('AppSettingsMain');
          }}
        />
      </Menu> */}
  </Appbar.Header>

  )
}

export default HomeScreenAppbar

const styles = StyleSheet.create({})