import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  LoginScreen,
  ForgotPasswordScreen,
  // OTPScreen,
  // ResetPasswordScreen,
  SignupWithEmail,
  OTPScreen,
  ResetPasswordScreen,
  // CheckEmail,
} from '../screens/auth/Index';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />

      <Stack.Screen
        name="SignUpwithEmail"
        options={{
          presentation: 'modal',
          headerShown: false,
          title: 'Sign up with email',
        }}
        component={SignupWithEmail}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{
          title: 'Forgot password',
          presentation: 'modal',
          headerShown: false,
        }}
        component={ForgotPasswordScreen}
      />

      <Stack.Screen
        name="OTPScreen1"
        component={OTPScreen}
        options={{
          title: 'OTP',
          headerShown:false
        }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{
          title: 'Reset password',
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
