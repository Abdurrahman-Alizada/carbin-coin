import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Myprofile from '../screens/drawer/myProfile/ProfileIndex';
import NeedHelp from '../screens/drawer/needHelp/Index';
import GeneralAppbar from '../components/Appbars/GeneralAppbar';
import AddPhoneNumberIndex from '../screens/drawer/myProfile/userInfo/AddPhoneNumber/AddPhoneNumberIndex';
import OTPScreen from '../screens/drawer/myProfile/userInfo/AddPhoneNumber/OTPScreen';
import VerificationIndex from '../screens/drawer/myProfile/SecuritySettings/verficationLevel/VerificationIndex';
import ChangePassword from '../screens/drawer/myProfile/SecuritySettings/ChangePassword';
import TwoFactorAuthIndex from '../screens/drawer/myProfile/SecuritySettings/twoFactorAuth/TwoFactorAuthIndex';
import Instruction from '../screens/drawer/myProfile/SecuritySettings/twoFactorAuth/Instruction';
import TwoFAConfirm from '../screens/drawer/myProfile/SecuritySettings/twoFactorAuth/2FAConfirm';
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Myprofile}
        // options={{
        //   header: props => <GeneralAppbar title="Profile" {...props} />,
        // }}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NeedHelp"
        component={NeedHelp}
        options={{
          header: props => <GeneralAppbar title="Need Help" {...props} />,
        }}
      />

      <Stack.Screen
        name="AddPhoneNumber"
        component={AddPhoneNumberIndex}
        options={{
          header: props => (
            <GeneralAppbar title="Add phone number" {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          header: props => <GeneralAppbar title="OTP screen" {...props} />,
        }}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationIndex}
        options={{
          header: props => <GeneralAppbar title="Verification" {...props} />,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TwoFactorAuth"
        component={TwoFactorAuthIndex}
        options={{
          header: props => (
            <GeneralAppbar title="Two Factor authentication" {...props} />
          ),
        }}
      />

      <Stack.Screen
        name="TwoFactorAuthInstruction"
        component={Instruction}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TwoFactorAuthConfirm"
        component={TwoFAConfirm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
