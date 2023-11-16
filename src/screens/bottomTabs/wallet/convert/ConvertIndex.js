import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {
  Card,
  Text,
  Avatar,
  Button,
  useTheme,
  TextInput,
  Divider,
  IconButton,
  Portal,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import CountryFlag from 'react-native-country-flag';
import ButtonLinearGradient from '../../../../components/ButtonLinearGradient';

const ConvertIndex = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const curr = useSelector(state => state.user.curr);
  const [selectedCurrency, setSelectedCurrency] = useState(-1);
  const [selectedConvertFromCurrency, setSelectedConvertFromCurrency] =
    useState({});
  const [selectedConvertToCurrency, setSelectedConvertToCurrency] = useState(
    {},
  );
  const [number, setNumber] = useState(2);

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: '4%',
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <Text style={{textAlign: 'center', fontSize: 16}}>
        {t(
          'Convert your traditional and crypto currencies with ease. Just choose an exchanging pair.',
        )}
      </Text>

      <View style={{marginTop: '4%'}}>
        <Card style={{}}>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                setNumber(1);
                onOpen();
              }} // key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: '1%',
                backgroundColor: theme.colors.secondaryContainer,
                borderRadius: 40,
              }}>
              <View
                style={{
                  marginLeft: '10%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CountryFlag
                  isoCode={
                    selectedConvertFromCurrency?.countryCode
                      ? selectedConvertFromCurrency?.countryCode
                      : "ca"
                  }
                  size={22}
                />

                <Text
                  style={{
                    fontSize: 16,
                    marginHorizontal: '5%',
                    fontWeight: 'bold',
                  }}>
                  {selectedConvertFromCurrency?.nickName
                    ? selectedConvertFromCurrency?.nickName
                    : curr[0].nickName}
                </Text>
                <IconButton
                  size={25}
                  icon="chevron-down"
                  style={{backgroundColor: theme.colors.primaryContainer}}
                />
              </View>
            </TouchableOpacity>

            <View style={{alignItems: 'flex-end'}}>
              <Text variant="bodyMedium">Balance:</Text>
              <Text variant="bodyMedium">
                D$ {selectedConvertFromCurrency?.balance ? selectedConvertFromCurrency?.balance : curr[0].balance}
              </Text>
            </View>
          </Card.Content>
          <Card.Content style={{marginTop: '4%'}}>
            <Text variant="bodyMedium">You pay</Text>

            <TextInput
              style={{
                marginTop: '2%',
                backgroundColor: theme.colors.background,
              }}
              label="D$"
              keyboardType="numeric"
              //   left={<TextInput.Icon icon="eye" />}
              //   value={sendAmount}
              //   onChangeText={text => setText(text)}
            />
          </Card.Content>
        </Card>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>1.0</Text>
          <IconButton
            icon="arrow-down"
            // iconColor={MD3Colors.error50}
            size={20}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            icon="arrow-up"
            // iconColor={MD3Colors.error50}
            size={20}
            onPress={() => console.log('Pressed')}
          />

          <Text>0.88</Text>
        </View>

        <Card style={{}}>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                setNumber(2);
                onOpen();
              }} // key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: '1%',
                backgroundColor: theme.colors.secondaryContainer,
                borderRadius: 40,
              }}>
              <View
                style={{
                  marginLeft: '10%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CountryFlag
                  isoCode={
                    selectedConvertToCurrency?.countryCode
                      ? selectedConvertToCurrency?.countryCode
                      : "ca"
                  }
                  size={22}
                />


                <Text
                  style={{
                    fontSize: 16,
                    marginHorizontal: '5%',
                    fontWeight: 'bold',
                  }}>
                  {selectedConvertToCurrency?.nickName
                    ? selectedConvertToCurrency?.nickName
                    : curr[0].nickName}
                </Text>
                <IconButton
                  size={25}
                  icon="chevron-down"
                  style={{backgroundColor: theme.colors.primaryContainer}}
                />
              </View>
            </TouchableOpacity>

            <View style={{alignItems: 'flex-end'}}>
              <Text variant="bodyMedium">Balance:</Text>
              <Text variant="bodyMedium">
                D$ {selectedConvertToCurrency?.balance}
              </Text>
            </View>
          </Card.Content>
          <Card.Content style={{marginTop: '4%'}}>
            <Text variant="bodyMedium">You get</Text>

            <TextInput
              style={{
                marginTop: '2%',
                backgroundColor: theme.colors.background,
              }}
              label="D$"
              keyboardType="numeric"
              //   left={<TextInput.Icon icon="eye" />}
              //   value={sendAmount}
              //   onChangeText={text => setText(text)}
            />
          </Card.Content>
        </Card>

        <ButtonLinearGradient
          style={{marginVertical: '10%', width: '100%', alignSelf: 'center'}}>
          <Button
            // disabled={isDisabled}
            style={{
              backgroundColor: 'transparent',
            }}
            contentStyle={{padding: '3%'}}
            theme={{roundness: 10}}
            mode="contained"
            // onPress={verify}
            >
            {t('Convert')}
          </Button>
        </ButtonLinearGradient>

      </View>

      <Portal>
        <Modalize
          handlePosition="inside"
          modalStyle={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.onBackground,
            borderWidth: 1,
          }}
          handleStyle={{backgroundColor: theme.colors.onBackground}}
          HeaderComponent={() => (
            <View style={{paddingHorizontal: '2%'}}>
              <IconButton
                icon="close"
                style={{alignSelf: 'flex-end'}}
                // iconColor={MD3Colors.error50}
                size={25}
                onPress={() => onClose()}
              />
            </View>
          )}
          ref={modalizeRef}>
          <View style={{paddingHorizontal: '4%'}}>
            {curr?.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  number == 2
                    ? setSelectedConvertToCurrency(item)
                    : setSelectedConvertFromCurrency(item);
                  onClose();
                }}
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
                    D$ {item.balance}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Modalize>
      </Portal>
    </ScrollView>
  );
};

export default ConvertIndex;

const styles = StyleSheet.create({});
