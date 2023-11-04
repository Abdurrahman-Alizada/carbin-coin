import React, {useState, useRef, createRef} from 'react';
import {View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {IconButton, Text} from 'react-native-paper';
function QRgenerator() {
  const [QRvalue, setQRValue] = useState('lintang');
  const [QRImage, setQRImage] = useState('');

  return (
    <View style={{}}>
      {/* <QRCode value="http://awesome.link.qr" /> */}
      <Text style={{textAlign: 'center', marginTop: '4%', fontSize: 17}}>
        Scan the below generated QR code
      </Text>
      <View style={{alignItems: 'center', marginTop: '5%'}}>
        <QRCode
          value={QRvalue ? QRvalue : 'lintang'}
          size={200}
          // logo={{uri: yourqrlogo}}
          logoSize={60}
          logoBackgroundColor="transparent"
          getRef={ref => setQRImage(ref)}
        />
      </View>
      
    </View>
  );
}

export default QRgenerator;
