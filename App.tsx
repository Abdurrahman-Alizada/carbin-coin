import 'react-native-gesture-handler';
import './locales/i18next';

import React, {useCallback, useMemo, useLayoutEffect, useState} from 'react';
import {ThemeContext} from './src/themeContext';

import {StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Onboarding from './src/screens/Onboarding/OnboardingScreen';

import Auth from './src/navigation/AuthStack'; //Authentication routes
import Main from './src/navigation/Main';

import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {lightPalette, darkPalette} from './src/GlobalStyles';

const Stack = createStackNavigator();

import {LogBox} from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs(['Possible Unhandled']);
LogBox.ignoreLogs(['This synthetic event is reused for performance reasons.']);

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  Snackbar,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
} from 'react-native-paper';
export const App = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...PaperDarkTheme?.colors,
      ...NavigationDarkTheme.colors,
      ...darkPalette,
    },
  };

  const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...PaperDefaultTheme?.colors,
      ...NavigationDefaultTheme.colors,
      ...lightPalette,
    },
  };

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeContext.Provider value={preferences}>
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="SplashScreen">
                {/* SplashScreen which will come once for 5 Seconds */}
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{headerShown: false}}
                />
                {/* Auth Navigator which includes Login Signup, will come once */}
                <Stack.Screen
                  name="Auth"
                  component={Auth}
                  options={{headerShown: false}}
                />
                {/* onboarding screen for first time open */}
                <Stack.Screen
                  name="Onboarding"
                  component={Onboarding}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Main"
                  component={Main}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </Provider>
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
