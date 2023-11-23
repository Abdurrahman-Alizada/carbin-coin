import {
  StyleSheet,
  View,
  SafeAreaView,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconButton, Button, Portal, Dialog, Divider} from 'react-native-paper';
import {CameraScreen} from 'react-native-camera-kit';
import ButtonLinearGradient from '../../../../../components/ButtonLinearGradient';

const Scanner = ({setScanOpen}) => {
  const [qrvalue, setQrvalue] = useState({});
  const [opneScanner, setOpneScanner] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const onBarcodeScan = value => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(handleSplit(value));
    setOpneScanner(false);
    setScanOpen(false);
    setVisible(true);
  };

  const handleSplit = text => {
    if (!text) return false;
    const [userName, balance] = text?.split('+');
    return {userName: userName, balance: Number(balance)};
  };

  // useEffect(()=>{
  //   const detail = handleSplit(qrvalue)
  //   console.log(detail)
  // },[])

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
            setScanOpen(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
      setScanOpen(true);
    }
  };

  return (
    <View style={{}}>
      {opneScanner ? (
        <View style={{flex: 1}}>
          <CameraScreen
            scanBarcode={true}
            laserColor={'blue'}
            frameColor={'yellow'}
            colorForScannerFrame={'black'}
            onReadCode={event =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
            showFrame={true}
          />
        </View>
      ) : (
        <View style={{}}>
          <Text
            style={{marginVertical: '10%', fontSize: 20, textAlign: 'center'}}>
            Or
          </Text>
          <ButtonLinearGradient style={{margin: '10%'}}>
            <Button
              mode="contained"
              style={{backgroundColor: 'transparent'}}
              theme={{roundness: 5}}
              icon="line-scan"
              contentStyle={{padding: '4%'}}
              onPress={onOpneScanner}>
              {'Scan'}
            </Button>
          </ButtonLinearGradient>
        </View>
      )}

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <View
            style={{
              marginTop: -2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Dialog.Title>Payment</Dialog.Title>
            </View>
            <IconButton icon={'close'} />
          </View>
          <Divider />
          <Dialog.Content style={{paddingVertical: '5%'}}>
            {isPaymentSuccessful ? (
              <View style={{alignItems:"center"}}>
                <IconButton icon={'check-decagram'} size={45} style={{alignSelf:"center"}} />
               <Text style={{textAlign:"center"}}>You payment has been processed successfuly.</Text>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Receiver name</Text>
                  <Text style={{fontWeight: 'bold'}}> {qrvalue.userName}</Text>
                </View>

                <View
                  style={{
                    marginTop: '5%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Amount</Text>
                  <Text style={{fontWeight: 'bold', fontSize: 25}}>
                    <Text style={{fontSize: 20, fontWeight: 'normal'}}>$</Text>
                    {qrvalue.balance}
                  </Text>
                </View>
              </View>
            )}
          </Dialog.Content>

          <Dialog.Actions style={{marginTop: '5%'}}>
            {isPaymentSuccessful ? (
              <ButtonLinearGradient style={{width: '100%'}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: 'transparent'}}
                  theme={{roundness: 5}}
                  contentStyle={{padding: '2%'}}
                  onPress={() => {
                    setVisible(false);
                  }}>
                  Ok
                </Button>
              </ButtonLinearGradient>
            ) : (
              <ButtonLinearGradient style={{width: '100%'}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: 'transparent'}}
                  theme={{roundness: 5}}
                  contentStyle={{padding: '2%'}}
                  onPress={() => {
                    setIsPaymentSuccessful(true);
                  }}>
                  Pay now
                </Button>
              </ButtonLinearGradient>
            )}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Scanner;
