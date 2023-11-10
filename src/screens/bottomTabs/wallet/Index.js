import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
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
import {useSelector} from 'react-redux';
import CountryFlag from 'react-native-country-flag';
import WalletIndex from '../../../Skeletons/Wallet/WalletIndex';

const Index = ({navigation}) => {
  const {t} = useTranslation();

  const theme = useTheme();
  const [showAllcoins, setShowAllCoins] = useState(true);

  const curr = useSelector(state => state.user.curr);
  const [selectedCurrency, setSelectedCurrency] = useState(-1);

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
   func()
  },[]);

const func = ()=>{
  setIsLoading(true)
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
}

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <HomeScreenAppbar title={'Wallet'} />

      {isLoading ? (
        <WalletIndex />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={()=>func()} />
          }
          contentContainerStyle={{marginBottom: 0}}>
          <Text
            style={{
              marginTop: '4%',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            {t('Total balance of my account and cards')}
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
                <Text>{t('Top up')}</Text>
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
                <Text>{t('Send')}</Text>
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
                <Text>{t('Convert')}</Text>
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
                <Text>{t('Invest')}</Text>
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
              <Text>{t('Caribbean coin accounts')}</Text>
              {showAllcoins ? (
                <TouchableOpacity
                  onPress={() => setShowAllCoins(false)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>{t('Show less')}</Text>
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
                  <Text>{t('All')}</Text>
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: '1%',
                    paddingHorizontal: '2%',
                  }}>
                  <CountryFlag isoCode={curr[0].countryCode} size={22} />

                  <Text
                    style={{
                      fontSize: 20,
                      color: theme.colors.onPrimary,
                      marginLeft: '10%',
                    }}>
                    {curr[0].nickName}
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
                curr?.slice(1)?.map((item, index) => (
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
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: '1%',
                        paddingHorizontal: '2%',
                      }}>
                      <CountryFlag isoCode={item?.countryCode} size={22} />

                      <Text
                        style={{
                          fontSize: 20,
                          color: theme.colors.onPrimary,
                          marginLeft: '10%',
                        }}>
                        {item?.nickName}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{fontSize: 16, color: theme.colors.onPrimary}}>
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
                style={{marginVertical: '8%'}}
                onPress={() => navigation.navigate('AddNewCurrency')}>
                {t('Add new currency')}
              </Button>
            </View>

            {/* <View
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
          </View> */}
          </View>
        </ScrollView>
      )}
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
          <View style={{paddingHorizontal: '2%'}}>
            {curr?.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCurrency(index);
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
                    {item.nickName}
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
