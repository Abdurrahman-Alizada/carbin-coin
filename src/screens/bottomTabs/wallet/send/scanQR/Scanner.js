import {
  StyleSheet,
  View,
  SafeAreaView,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Text, IconButton, Button} from 'react-native-paper';
import {CameraScreen} from 'react-native-camera-kit';

const Scanner = ({setScanOpen}) => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = qrvalue => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
    setScanOpen(false);
  };

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
          <Text style={styles.textStyle}>
            {qrvalue ? 'Scanned Result: ' + qrvalue : ''}
          </Text>

          {qrvalue.includes('https://') ||
          qrvalue.includes('http://') ||
          qrvalue.includes('geo:') ? (
            <Button onPress={onOpenlink} mode="outlined" style={{marginHorizontal:"5%"}}>
                {qrvalue.includes('geo:') ? 'Open in Map' : 'Next functionality'}
            </Button>
          ) : null}


          <Text style={styles.textStyle}>
            {qrvalue
              ? 'from here we will be able to do next functionality i.e transfer money, top up or other.'
              : ''}
          </Text>

          <Text style={{marginBottom: '4%', textAlign: 'center'}}>Or</Text>
          <Button
            mode="contained"
            style={{marginHorizontal:"5%"}}
            theme={{roundness: 5}}
            contentStyle={{padding: '2%'}}
            onPress={onOpneScanner}>
            {qrvalue ? 'Sacan again' : 'Open QR Scanner'}
          </Button>
        </View>
      )}
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});
