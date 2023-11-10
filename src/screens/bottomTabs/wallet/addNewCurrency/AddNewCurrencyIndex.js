import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme, Text, Avatar, Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import CountryFlag from 'react-native-country-flag';
import ButtonLinearGradient from '../../../../components/ButtonLinearGradient';

const Index = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const curr = useSelector(state => state.user.curr);
  const [selectedCurrency, setSelectedCurrency] = useState(-1);
  return (
    <View
      style={{
        padding: '5%',
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <Text style={{textAlign: 'center', fontSize: 16, lineHeight: 25}}>
        {t(
          'You can add these currencies to your account and hold digital cash in it.',
        )}
      </Text>
      <Text style={{marginTop: '8%', lineHeight: 25}}>Select currency</Text>

      <View>
        {curr?.slice().map((item, index) => (
          <TouchableOpacity
            onPress={() => setSelectedCurrency(index)}
            key={index}
            style={{
              flexDirection: 'row',
              marginTop: '3%',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: '1%',
              paddingVertical: '2%',
              backgroundColor:
                index === selectedCurrency
                  ? theme.colors.secondaryContainer
                  : theme.colors.background,
              borderRadius: 40,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: '1%',
                paddingHorizontal: '2%',
                alignItems: 'center',
              }}>
              <CountryFlag isoCode={item?.countryCode} size={22} />

              <Text
                style={{
                  fontSize: 16,
                  marginLeft: '5%',
                }}>
                {item.name}{' '}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: '3%',
                }}>
                {item.nickName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <ButtonLinearGradient style={{marginTop: '8%'}}>
          <Button
            contentStyle={{padding: '1%'}}
            // icon="camera"
            style={{backgroundColor:"transparent"}}
            disabled={!(selectedCurrency > -1)}
            mode="contained"
            theme={{roundness: 6}}
            onPress={() => navigation.goBack()}>
            Add currency
          </Button>
        </ButtonLinearGradient>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
