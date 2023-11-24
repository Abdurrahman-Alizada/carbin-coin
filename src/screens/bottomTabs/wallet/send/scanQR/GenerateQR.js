import React, {useState, useRef, createRef} from 'react';
import {View, Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {
  IconButton,
  useTheme,
  Portal,
  Dialog,
  Paragraph,
  Button,
  TextInput,
} from 'react-native-paper';
import Logo from '../../../../../assets/splash-screen/carib-coin-logo.png';
import {useSelector} from 'react-redux';
import ButtonLinearGradient from '../../../../../components/ButtonLinearGradient';

function QRgenerator() {
  const theme = useTheme();
  const currentLoginUser = useSelector(
    state => state.user.currentLoginUser.data,
  );
  const [isVisibleQR, setIsVisibleQR] = useState(false);
  // const [QRReceiverName, setQRReceiverName] = useState(currentLoginUser?.name);
  const [QRReceiverName, setQRReceiverName] = useState("Jang");
  const [QRReceiverBalance, setQRReceiverBalance] = useState('');

  const [visible, setVisible] = useState(false);

  return (
    <View style={{}}>
      <View style={{alignItems: 'center', marginTop: '5%'}}>
        {isVisibleQR ? (
          <View style={{alignItems: 'center'}}>
            <Text
              style={{textAlign: 'center', marginVertical: '4%', fontSize: 17}}>
              Scan the below generated QR code
            </Text>
            <QRCode
              value={`${QRReceiverName}+${QRReceiverBalance}`}
              size={200}
              logo={require('../../../../../assets/splash-screen/carib-coin-logo.png')}
              logoSize={50}
              logoBackgroundColor="transparent"
              backgroundColor={'transparent'}
              // getRef={ref => setQRImage(ref)}
            />
          </View>
        ) : (
          <View style={{width: '80%'}}>
            <ButtonLinearGradient
              style={{marginVertical: '10%', width: '100%'}}>
              <Button
                mode="contained"
                style={{backgroundColor: 'transparent'}}
                theme={{roundness: 5}}
                icon="qrcode"
                contentStyle={{padding: '4%'}}
                onPress={() => setVisible(true)}>
                Generate QR code
              </Button>
            </ButtonLinearGradient>
          </View>
        )}
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>QR code</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label={'Your account name'}
              mode="outlined"
              editable={false}
              style={{marginTop: '2%'}}
              value={QRReceiverName}
              activeOutlineColor={theme.colors.secondary}
            />
            <TextInput
              label={'Enter amount'}
              mode="outlined"
              autoFocus
              style={{marginTop: '4%'}}
              value={QRReceiverBalance}
              activeOutlineColor={theme.colors.secondary}
              onChangeText={e => setQRReceiverBalance(e)}
              keyboardType="numeric"
            />
            <View style={{marginTop: '5%'}}>
              <Text style={{fontWeight: '700'}}>*Instructions</Text>
              <Text style={{marginLeft: '3%', marginVertical: '2%'}}>
                1. If you know the amount you will get paid, enter the amount
                and generate QR code.
              </Text>
              <Text style={{marginLeft: '3%'}}>
                2. If you don't know how much you will get paid, you can just
                enter name without amount. Then when sender scans QR code,
                he/she will enter the amount.
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <ButtonLinearGradient style={{width: '100%'}}>
              <Button
                mode="contained"
                style={{backgroundColor: 'transparent'}}
                theme={{roundness: 5}}
                contentStyle={{padding: '2%'}}
                // disabled={!QRReceiverBalance}
                onPress={() => {
                  setVisible(false);
                  setIsVisibleQR(true);
                }}>
                Generate
              </Button>
            </ButtonLinearGradient>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default QRgenerator;
