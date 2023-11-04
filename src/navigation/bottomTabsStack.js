import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GeneralAppbar from '../components/Appbars/GeneralAppbar';

const Stack = createStackNavigator();

import Tabs from '../screens/bottomTabs/Index';

import AddNewCurrency from '../screens/bottomTabs/wallet/addNewCurrency/AddNewCurrencyIndex';
import TopUpIndex from '../screens/bottomTabs/wallet/topUp/TopUpIndex';
import BankTransferIndex from '../screens/bottomTabs/wallet/topUp/bankTransfer/BankTransferIndex';
import SendIndex from '../screens/bottomTabs/wallet/send/SendIndex';
import ConvertIndex from '../screens/bottomTabs/wallet/convert/ConvertIndex';
import ContantsIndex from '../screens/bottomTabs/wallet/send/ToContact/ContantsIndex';
import QRIndex from '../screens/bottomTabs/wallet/send/scanQR/QRIndex';
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />

      {/* wallet module */}
      <Stack.Screen
        name="AddNewCurrency"
        component={AddNewCurrency}
        options={{
          header: props => (
            <GeneralAppbar title="Add new currency" {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="TopUp"
        component={TopUpIndex}
        options={{
          header: props => <GeneralAppbar title="Top up" {...props} />,
        }}
      />

      <Stack.Screen
        name="BankTransferTopUp"
        component={BankTransferIndex}
        options={{
          header: props => <GeneralAppbar title="Bank transfer" {...props} />,
        }}
      />

      {/* send money */}
      <Stack.Screen
        name="SendMoney"
        component={SendIndex}
        options={{
          header: props => <GeneralAppbar title="Send" {...props} />,
        }}
      />
      <Stack.Screen
        name="ToContact"
        component={ContantsIndex}
        options={{
          header: props => <GeneralAppbar title="Contacts" {...props} />,
        }}
      />

      <Stack.Screen
        name="QRScan"
        component={QRIndex}
        options={{
          header: props => <GeneralAppbar title="QR code scan" {...props} />,
        }}
      />

      {/* send money end*/}

      <Stack.Screen
        name="ConvertMoney"
        component={ConvertIndex}
        options={{
          header: props => <GeneralAppbar title="Convert" {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
