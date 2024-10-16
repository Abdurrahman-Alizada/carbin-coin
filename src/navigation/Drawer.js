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
import CardIndex from '../screens/drawer/cards/CardIndex';
import NewCard from '../screens/drawer/cards/NewCard';
import IDVerificationIndex from '../screens/drawer/myProfile/SecuritySettings/verficationLevel/IDVerification/IDVerificationIndex';
import CountriesList from '../screens/drawer/myProfile/SecuritySettings/verficationLevel/IDVerification/CountriesList';
import Wallet from '../screens/drawer/myProfile/SecuritySettings/Wallet';
import ReferralSystemIndex from '../screens/drawer/referralSystem/referralSystemIndex';

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
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Cards"
        component={CardIndex}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewCard"
        component={NewCard}
        options={{headerShown: false}}
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
        name="ReferralSystem"
        component={ReferralSystemIndex}
        options={{
          headerShown: false,
          presentation: 'modal',
          header: props => <GeneralAppbar title="Invitation code" {...props} />,
        }}
      />

      {/* user verification - start */}
      <Stack.Screen
        name="Verification"
        component={VerificationIndex}
        options={{
          header: props => <GeneralAppbar title="Verification" {...props} />,
        }}
      />

      <Stack.Screen
        name="IDVerificationCountry"
        component={IDVerificationIndex}
        options={{
          header: props => <GeneralAppbar title="ID verification" {...props} />,
        }}
      />
      <Stack.Screen
        name="CountriesList"
        component={CountriesList}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      {/* user verification - end */}

      <Stack.Screen
        name="EthereumWallet"
        component={Wallet}
        options={{
          // headerShown: false,
          presentation: 'modal',
          header: props => <GeneralAppbar title="Crypto wallet" {...props} />,
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
