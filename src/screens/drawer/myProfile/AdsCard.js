import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {useTheme, Text} from 'react-native-paper';
const AdsCard = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        marginVertical: '8%',
        marginHorizontal: '3%',
      }}>
        <Text style={{marginVertical:"5%", textAlign:"center", fontSize:20}}>Caribbean token</Text>
      <View
        style={{
          borderRadius: 10,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: theme.colors.tertiaryContainer,
          padding: '3%',
        }}>
        <View style={{maxWidth: '75%'}}>
          <Text style={{fontWeight: 'bold'}}>Win up to $10,000</Text>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's stand
          </Text>
        </View>
        <Image
          style={{
            width: 80,
            height: 80,
          }}
          source={require('../../../assets/splash-screen/carib-coin-logo.png')}
        />
      </View>
    </View>
  );
};

export default AdsCard;

const styles = StyleSheet.create({});
