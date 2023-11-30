import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  IconButton,
  List,
  Snackbar,
  Text,
  useTheme,
} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import {useUpdateWalletInfoOfUserMutation} from '../../../../redux/reducers/user/userThunk';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Wallet = ({ethereum}) => {
  const theme = useTheme();
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);
  const currentLoginUser = useSelector(
    state => state.user.currentLoginUser.data,
  );
  const [visible, setVisible] = useState(false);

  // wallet
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

  const [
    updateWalletInfoOfUser,
    {isLoading: isWalletLoading, isError: isWalletError, error: walletError},
  ] = useUpdateWalletInfoOfUserMutation();

  const handleUpdateWalletInfoOfUser = async () => {
    const ethereum = {
      isWallet: true,
      walletAddress: address,
    };
    updateWalletInfoOfUser({
      userId: currentLoginUser?._id,
      ethereum: ethereum,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (address) {
      handleUpdateWalletInfoOfUser();
    }
  }, [isConnected]);

  return (
    <View style={{justifyContent: 'space-between', padding: '0%', flex: 1}}>
      {isWalletLoading ? (
        <View>
          <List.Item
            title={props => (
              <SkeletonPlaceholder borderRadius={4} {...props}>
                <SkeletonPlaceholder.Item width="60%" height={15} />
                <SkeletonPlaceholder.Item
                  marginTop={7}
                  width="30%"
                  height={12}
                />
              </SkeletonPlaceholder>
            )}
            left={props => (
              <SkeletonPlaceholder borderRadius={4} {...props}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="flex-start">
                  <SkeletonPlaceholder.Item
                    width={50}
                    marginLeft={20}
                    height={50}
                    borderRadius={50}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            )}
          />
          <List.Item
            title={props => (
              <SkeletonPlaceholder borderRadius={4} {...props}>
                <SkeletonPlaceholder.Item width="60%" height={15} />
                <SkeletonPlaceholder.Item
                  marginTop={7}
                  width="30%"
                  height={12}
                />
              </SkeletonPlaceholder>
            )}
            left={props => (
              <SkeletonPlaceholder borderRadius={4} {...props}>
                <SkeletonPlaceholder.Item
                  flexDirection="column"
                  alignItems="flex-start">
                  <SkeletonPlaceholder.Item
                    width={50}
                    marginLeft={20}
                    height={50}
                    borderRadius={50}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            )}
          />
        </View>
      ) : (
        <View style={{justifyContent: 'space-between', padding: '0%', flex: 1}}>
          {isConnected ? (
            <View>
              <List.Item
                title="Wallet address:"
                titleStyle={{fontWeight: 'bold'}}
                description={currentLoginUser?.ethereum?.walletAddress}
                // description={address}
                style={{alignItems: 'center', justifyContent: 'center'}}
                right={props => (
                  <IconButton
                    {...props}
                    onPress={() => setVisible(true)}
                    icon={'content-copy'}
                  />
                )}
              />
              <Button
                contentStyle={{
                  padding: '2%',
                }}
                style={{margin: '5%'}}
                icon={isConnected ? 'close-circle' : 'wallet'}
                theme={{roundness: 15}}
                mode={isConnected ? 'contained-tonal' : 'elevated'}
                onPress={handleButtonPress}>
                {isConnected ? 'Disconnect wallet' : 'Connect wallet'}
              </Button>
            </View>
          ) : (
            <View>
              <List.Item
                title="Caribbean-coin wallet address:"
                titleStyle={{fontWeight: 'bold'}}
                description={currentLoginUser?.ethereum?.address}
                style={{alignItems: 'center', justifyContent: 'center'}}
                right={props => (
                  <IconButton
                    {...props}
                    onPress={() => setVisible(true)}
                    icon={'content-copy'}
                  />
                )}
              />
              <List.Item
                title="Private key:"
                titleStyle={{fontWeight: 'bold'}}
                description={currentLoginUser?.ethereum?.privateKey}
                style={{alignItems: 'center', justifyContent: 'center'}}
                descriptionStyle={{
                  color: isPrivateKeyVisible
                    ? theme.colors.onBackground
                    : '#fff0',
                  backgroundColor: isPrivateKeyVisible
                    ? theme.colors.background
                    : '#fff',
                  textShadowRadius: isPrivateKeyVisible ? 0 : 10,
                }}
                right={props => (
                  <IconButton
                    {...props}
                    onPress={() => setIsPrivateKeyVisible(!isPrivateKeyVisible)}
                    icon={setIsPrivateKeyVisible ? 'eye-off' : 'eye'}
                  />
                )}
              />

              {isPrivateKeyVisible && (
                <Button
                  icon="content-copy"
                  mode="text"
                  //   style={{width: '70%', alignSelf: 'center'}}
                  onPress={() => setVisible(true)}>
                  Click here to copy
                  {/* {t('Click here to copy')} */}
                </Button>
              )}
            </View>
          )}

          {!isConnected && (
            <Button
              // loading={isLoading || resendLoading}
              // disabled={isLoading || resendLoading}
              contentStyle={{
                padding: '2%',
              }}
              style={{margin: '5%'}}
              icon={isConnected ? 'close-circle' : 'wallet'}
              theme={{roundness: 15}}
              mode={isConnected ? 'contained-tonal' : 'elevated'}
              onPress={handleButtonPress}>
              {isConnected ? 'Disconnect wallet' : 'Connect wallet'}
            </Button>
          )}
          <WalletConnectModal
            projectId={projectId}
            providerMetadata={providerMetadata}
          />
        </View>
      )}

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={1000}>
        {/* {t('Key copied successfully!')} */}
        Key copied successfully!
      </Snackbar>
    </View>
  );
};

export default Wallet;
