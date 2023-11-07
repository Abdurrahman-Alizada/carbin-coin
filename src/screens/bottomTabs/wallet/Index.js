import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  Avatar,
  Text,
  Card,
  Button,
  useTheme,
  Divider,
  Portal,
  IconButton,
} from 'react-native-paper';
import {Modalize} from 'react-native-modalize';
import {useTranslation} from 'react-i18next';

import HomeScreenAppbar from '../../../components/Appbars/HomeScreenAppbar';

const Index = ({navigation}) => {
  const {t} = useTranslation();

  const theme = useTheme();
  const [showAllcoins, setShowAllCoins] = useState(true);

  const [curr, setCurr] = useState([
    {
      id: 0,
      name: 'Digital candian dollar',
      nickName: 'DCNH',
      image: '',
      balance: 98.01,
      sign: '$',
    },
    {
      id: 1,
      name: 'Digital candian dollar',
      nickName: 'DCNH',
      image: '',
      balance: 80.01,
      sign: '$',
    },
    {
      id: 2,
      name: 'Digital candian dollar',
      nickName: 'DCNH',
      image: '',
      balance: 0,
      sign: '$',
    },
  ]);
  const [selectedCurrency, setSelectedCurrency] = useState(-1);

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <SafeAreaView style={{paddingBottom:70, backgroundColor:theme.colors.background}}>
      <HomeScreenAppbar title={'Wallet'} />

      <ScrollView contentContainerStyle={{marginBottom: 0}}>
        <Text
          style={{
            marginTop: '4%',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: '600',
          }}>
          Total balance of my account and cards
        </Text>
        <View style={{marginHorizontal: '4%'}}>
          <TouchableWithoutFeedback onPress={() => onOpen()}>
            <View
              style={{
                marginTop: '5%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: '5%',
                backgroundColor: theme.colors.primary,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 20, color: theme.colors.onPrimary}}>
                $
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: theme.colors.onPrimary,
                  marginLeft: '1%',
                }}>
                90.00
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <View
            style={{
              marginVertical: '4%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TopUp')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48%',
                marginTop: '3%',
                borderRadius: 10,
                padding: '3%',
                backgroundColor: theme.colors.primaryContainer,
              }}>
              <Avatar.Icon
                size={34}
                style={{backgroundColor: theme.colors.primaryContainer}}
                icon={'plus'}
              />
              <Text>Top up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SendMoney')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48%',
                marginTop: '3%',
                padding: '3%',
                borderRadius: 10,
                backgroundColor: theme.colors.primaryContainer,
              }}>
              <Avatar.Icon
                size={34}
                style={{backgroundColor: theme.colors.primaryContainer}}
                icon={'arrow-top-right'}
              />
              <Text>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ConvertMoney')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48%',
                marginTop: '3%',
                padding: '3%',
                borderRadius: 10,
                backgroundColor: theme.colors.primaryContainer,
              }}>
              <Avatar.Icon
                size={34}
                style={{backgroundColor: theme.colors.primaryContainer}}
                icon={'refresh-auto'}
              />
              <Text>Convert</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled
              onPress={() => console.log('hello')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48%',
                marginTop: '3%',
                padding: '3%',
                borderRadius: 10,
                backgroundColor: theme.colors.primaryContainer,
              }}>
              <Avatar.Icon
                size={34}
                style={{backgroundColor: theme.colors.primaryContainer}}
                icon={'angle-right'}
              />
              <Text>Invest</Text>
            </TouchableOpacity>
          </View>
          <Divider style={{marginVertical: '3%'}} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '4%',
            }}>
            <Text>Caribbean coin accounts</Text>
            {showAllcoins ? (
              <TouchableOpacity
                onPress={() => setShowAllCoins(false)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Show less</Text>
                <Avatar.Icon
                  style={{backgroundColor: theme.colors.background}}
                  size={35}
                  icon="chevron-up"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setShowAllCoins(true)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>All</Text>
                <Avatar.Icon
                  style={{backgroundColor: theme.colors.background}}
                  size={35}
                  icon="chevron-down"
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{marginTop: '4%'}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '3%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: '1%',
                paddingVertical: '2%',
                backgroundColor: theme.colors.primary,
                borderRadius: 40,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image
                  size={35}
                  source={require('../../../assets/splash-screen/carib-coin-logo.png')}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.onPrimary,
                    marginLeft: '2%',
                  }}>
                  DHKU
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16, color: theme.colors.onPrimary}}>
                  $
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.onPrimary,
                    marginLeft: '3%',
                  }}>
                  90.00
                </Text>
              </View>
            </View>

            {showAllcoins &&
              [1, 2, 3].map((n, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginTop: '3%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: '1%',
                    paddingVertical: '2%',
                    backgroundColor: theme.colors.primary,
                    borderRadius: 40,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar.Image
                      size={35}
                      source={require('../../../assets/splash-screen/carib-coin-logo.png')}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        color: theme.colors.onPrimary,
                        marginLeft: '2%',
                      }}>
                      DHKU
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: theme.colors.onPrimary}}>
                      $
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        color: theme.colors.onPrimary,
                        marginLeft: '3%',
                      }}>
                      90.00
                    </Text>
                  </View>
                </View>
              ))}

            <Button
              icon="plus"
              mode="text"
              style={{marginTop: '4%'}}
              onPress={() => navigation.navigate('AddNewCurrency')}>
              Add new currency
            </Button>
          </View>

          <View
            style={{
              marginVertical: '8%',
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
      </ScrollView>

      <Portal>
        <Modalize
          handlePosition="inside"
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
            {curr.map((item, index) => (
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Avatar.Image
                    size={35}
                    source={require('../../../assets/splash-screen/carib-coin-logo.png')}
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
      </Portal>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
