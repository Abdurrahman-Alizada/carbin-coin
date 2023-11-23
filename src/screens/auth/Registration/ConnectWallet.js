import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, useTheme} from 'react-native-paper';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import {useTranslation} from 'react-i18next';

const ConnectWallet = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {isOpen, open, close, provider, isConnected, address} =
    useWalletConnectModal();

  const projectId = '4287ee7f1533e4a2b7f5d0937ba341cf';

  const providerMetadata = {
    name: 'caribbean-coin',
    description: 'Caribbean coin project',
    url: 'https://app.caribbean-coin.com/',
    icons: ['https://app.caribbean-coin.com/carib-coin-logo.png'],
    redirect: {
      native: 'YOUR_APP_SCHEME://',
      universal: 'YOUR_APP_UNIVERSAL_LINK.com',
    },
  };

  // Function to handle the
  // console.log('first', isOpen, isConnected, address);
  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  return (
    <View>
      <Button
        // loading={isLoading || resendLoading}
        // disabled={isLoading || resendLoading}
        contentStyle={{
          padding: '3%',
        }}
        icon={isConnected ? 'close-circle' : 'wallet'}
        theme={{roundness: 15}}
        mode={isConnected ? 'contained-tonal' : 'elevated'}
        onPress={handleButtonPress}>
        {isConnected ? t('Disconnect wallet') : t('Connect wallet')}
      </Button>
      <Text style={{marginTop: '5%'}}>
        {isConnected ? 'Wallet address:' : ''} {address}
      </Text>
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </View>
  );
};

export default ConnectWallet;
