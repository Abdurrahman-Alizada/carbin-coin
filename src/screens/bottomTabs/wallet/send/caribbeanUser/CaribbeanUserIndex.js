import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Avatar,
  Button,
  Dialog,
  IconButton,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {Modalize} from 'react-native-modalize';
import {useTranslation} from 'react-i18next';
import ButtonLinearGradient from '../../../../../components/ButtonLinearGradient';

const CaribbeanUserIndex = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();

  const [curr, setCurr] = useState([
    {
      id: 0,
      name: 'Digital candian dollar',
      nickName: 'DCNH',
      image: '',
      balance: 98.01,
      sign: '€',
    },
    {
      id: 1,
      name: 'Digital candian dollar',
      nickName: 'IUH',
      image: '',
      balance: 80.01,
      sign: '$',
    },
    {
      id: 2,
      name: 'Digital candian dollar',
      nickName: 'DCNH',
      image: '',
      balance: 30,
      sign: '$',
    },
    {
      id: 3,
      name: 'Digital candian dollar',
      nickName: 'FHNH',
      image: '',
      balance: 0,
      sign: '$',
    },
  ]);

  const [amountTobeSend, setAmountTobeSend] = useState('');
  const [receiver, setReceiver] = useState('');

  const [selectedCoin, setSelectedCoin] = useState(curr[0]);
  const [selectedCoinIndex, setSelectedCoinIndex] = useState(0);

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  return (
    <View
      style={{
        padding: '5%',
        backgroundColor: theme.colors.background,
        flex: 1,
      }}>
      <ScrollView>
        <View style={{}}>
          <Text style={{marginBottom: '3%'}}>{t('Select coin')}</Text>

          <TouchableOpacity
            onPress={() => onOpen()}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '2%',
              backgroundColor: theme.colors.secondaryContainer,
              borderRadius: 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image
                  size={35}
                  source={require('../../../../../assets/splash-screen/carib-coin-logo.png')}
                  style={{marginHorizontal: '5%'}}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      marginHorizontal: '5%',
                      fontWeight: 'bold',
                    }}>
                    {selectedCoin.nickName}
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: '5%',
                    }}>
                    {selectedCoin.sign} {selectedCoin.balance}
                  </Text>
                </View>
              </View>
              <Avatar.Icon
                size={45}
                icon="chevron-down"
                style={{backgroundColor: theme.colors.primaryContainer}}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: '10%'}}>
          <View>
            <Text>{t('To account')}</Text>
            <TextInput
              value={receiver}
              onChangeText={e => setReceiver(e)}
              style={{
                marginTop: '2%',
                backgroundColor: theme.colors.background,
              }}
              placeholder="caribbean-coin user"
            />
            <Text style={{marginTop: '2%', color: theme.colors.greyLight}}>
              {t('Enter nick name, email or phone #')}
            </Text>
          </View>
          <Text
            style={{
              marginVertical: '7%',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '700',
            }}>
            {t('How much do you want to send?')}
          </Text>
          <View>
            <Text>{t('Amount')}</Text>
            <TextInput
              style={{
                backgroundColor: theme.colors.background,
              }}
              value={amountTobeSend}
              onChangeText={e => {
                setAmountTobeSend(e);
              }}
              placeholder="0.0"
              keyboardType="numeric"
              left={<TextInput.Icon icon={() => <Text>D$</Text>} />}
              right={
                <TextInput.Icon
                  size={40}
                  icon={() => (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                        }}>
                        {t('max')}
                      </Text>
                    </View>
                  )}
                />
              }
            />
            <Text style={{marginTop: '2%', color: theme.colors.greyLight}}>
              {t('Transaction fee')} D$ 0.0
            </Text>
          </View>

          <TextInput
            style={{
              marginTop: '15%',
              backgroundColor: theme.colors.background,
            }}
            placeholder={t('Add a note')}
          />

          <ButtonLinearGradient style={{marginVertical: '10%'}}>
            <Button
              mode="contained"
              style={{width: '100%', backgroundColor: 'transparent'}}
              theme={{roundness: 15}}
              contentStyle={{padding: '2%'}}
              onPress={() => {
                setVisible(true);
              }}>
              {t('Send')}
            </Button>
          </ButtonLinearGradient>
        </View>
      </ScrollView>

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
                size={25}
                onPress={() => onClose()}
              />
            </View>
          )}
          ref={modalizeRef}>
          <View style={{paddingHorizontal: '4%'}}>
            {curr.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCoin(item);
                  setSelectedCoinIndex(index);
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
                    index === selectedCoinIndex
                      ? theme.colors.secondaryContainer
                      : theme.colors.background,
                  borderRadius: 40,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Avatar.Image
                    size={35}
                    source={require('../../../../../assets/splash-screen/carib-coin-logo.png')}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: '5%',
                    }}>
                    {item.nickName}
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: '5%',
                    }}>
                    {item.sign}
                    {item.balance}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Modalize>

        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirm transaction</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Coin : {selectedCoin.nickName}</Text>
            <Text variant="bodyMedium">
              Amount : {selectedCoin.sign} {amountTobeSend}
            </Text>
            <Text variant="bodyMedium">To : {receiver}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
                navigation.goBack();
              }}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CaribbeanUserIndex;
