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
import {useDispatch, useSelector} from 'react-redux';
import CountryFlag from 'react-native-country-flag';
import WalletIndex from '../../../Skeletons/Wallet/WalletIndex';
import {useGetAccountsForUserQuery} from '../../../redux/reducers/accounts/accountsThunk';
import {handleUserAccounts} from '../../../redux/reducers/accounts/accountSlice';

const Index = ({navigation}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const currentLoginUser = useSelector(state => state.user.currentLoginUser);
  const [showAllcoins, setShowAllCoins] = useState(true);
  const [showAllTraditionAccounts, setShowAllTraditionAccounts] =
    useState(true);

  const curr = useSelector(state => state.user.curr);
  const [selectedCurrency, setSelectedCurrency] = useState(-1);
  // const accccc = useSelector(state => state.accounts.userAccounts);

  const {
    data: accounts,
    isError,
    error,
    isLoading: isAccountsLoading,
    refetch,
  } = useGetAccountsForUserQuery(currentLoginUser?.data?._id);
  useEffect(() => {
    if (accounts) {
      dispatch(handleUserAccounts(accounts));
    }
  }, [accounts]);

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <HomeScreenAppbar title={'Wallet'} />

      {/* {isAccountsLoading ? (
        <WalletIndex />
      ) : ( */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isAccountsLoading} onRefresh={refetch} />
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
                alignItems: 'baseline',
                paddingVertical: '5%',
                backgroundColor: theme.colors.primary,
                borderRadius: 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  textTransform: 'uppercase',
                  color: theme.colors.onPrimary,
                }}>
                {/* {accounts?.overAllAmount?.sign} */}
                {accounts?.caribbeanAccount?.totalAmount?.sign
                  ? accounts?.caribbeanAccount?.totalAmount?.sign
                  : "$"}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: theme.colors.onPrimary,
                  marginLeft: '1%',
                }}>
                {/* {accounts?.overAllAmount?.value} */}
                {accounts?.caribbeanAccount?.totalAmount?.value
                  ? accounts?.caribbeanAccount?.totalAmount?.value
                  : 0.0}
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
                width: '48%',
                marginTop: '3%',
                borderRadius: 50,
                backgroundColor: theme.colors.buttonBackground,
                height: 55,
              }}>
              <Avatar.Icon
                size={52}
                style={{backgroundColor: theme.colors.iconButtonBackground}}
                color={theme.colors.background}
                icon={'plus'}
              />
              <Text
                style={{
                  marginLeft: '5%',
                  color: theme.colors.onBackground,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                {t('Top up')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SendMoney')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '48%',
                marginTop: '3%',
                borderRadius: 50,
                backgroundColor: theme.colors.buttonBackground,
                height: 55,
              }}>
              <Avatar.Icon
                size={52}
                style={{backgroundColor: theme.colors.iconButtonBackground}}
                color={theme.colors.background}
                icon={'arrow-top-right'}
              />
              <Text
                style={{
                  marginLeft: '5%',
                  color: theme.colors.onBackground,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                {t('Send')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ConvertMoney')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '48%',
                marginTop: '3%',
                borderRadius: 50,
                backgroundColor: theme.colors.buttonBackground,
                height: 55,
              }}>
              <Avatar.Icon
                size={52}
                style={{backgroundColor: theme.colors.iconButtonBackground}}
                icon={'refresh-auto'}
                color={theme.colors.background}
              />
              <Text
                style={{
                  marginLeft: '5%',
                  color: theme.colors.onBackground,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                {t('Convert')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled
              onPress={() => console.log('hello')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '48%',
                marginTop: '3%',
                borderRadius: 50,
                backgroundColor: theme.colors.buttonBackground,
                height: 55,
              }}>
              <Avatar.Icon
                size={52}
                style={{backgroundColor: theme.colors.iconButtonBackground}}
                color={theme.colors.background}
                icon={'angle-right'}
              />
              <Text
                style={{
                  marginLeft: '5%',
                  color: theme.colors.onBackground,
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                {t('Invest')}
              </Text>
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
                paddingVertical: '2.2%',
                backgroundColor: theme.colors.secondary,
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
                  {accounts?.caribbeanAccount?.accounts[0]?.sign
                    ? accounts?.caribbeanAccount?.accounts[0]?.sign
                    : '$'}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.onPrimary,
                    marginLeft: '3%',
                  }}>
                  {accounts?.caribbeanAccount?.accounts[0]?.value
                    ? accounts?.caribbeanAccount?.accounts[0]?.value
                    : 0}
                </Text>
              </View>
            </View>

            {showAllcoins &&
              accounts?.caribbeanAccount?.accounts
                ?.slice(1)
                ?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      marginTop: '3%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: '1%',
                      paddingVertical: '2%',
                      backgroundColor: theme.colors.secondary,
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
                        {item.sign}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: theme.colors.onPrimary,
                          marginLeft: '3%',
                        }}>
                        {item?.value}
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

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '4%',
            }}>
            <Text>{t('Traditional accounts')}</Text>
            {showAllTraditionAccounts ? (
              <TouchableOpacity
                onPress={() => setShowAllTraditionAccounts(false)}
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
                onPress={() => setShowAllTraditionAccounts(true)}
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

          <View style={{marginTop: '4%', marginBottom: '8%'}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '3%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: '1%',
                paddingVertical: '2.2%',
                backgroundColor: theme.colors.secondary,
                borderRadius: 40,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: '1%',
                  paddingHorizontal: '2%',
                }}>
                <CountryFlag
                  isoCode={
                    accounts?.traditionalAccount?.accounts[0]?.countryCode
                      ? accounts?.traditionalAccount?.accounts[0]?.countryCode
                      : 'ca'
                  }
                  size={22}
                />

                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.onPrimary,
                    marginLeft: '10%',
                  }}>
                  {accounts?.traditionalAccount?.accounts[0]?.nickName}
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 16, color: theme.colors.onPrimary}}>
                  {accounts?.traditionalAccount?.accounts[0]?.sign
                    ? accounts?.traditionalAccount?.accounts[0]?.sign
                    : '$'}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.onPrimary,
                    marginLeft: '3%',
                  }}>
                  {accounts?.traditionalAccount?.accounts[0]?.value
                    ? accounts?.traditionalAccount?.accounts[0]?.value
                    : 0}
                </Text>
              </View>
            </View>

            {showAllTraditionAccounts &&
              accounts?.traditionalAccount?.accounts
                ?.slice(1)
                ?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      marginTop: '3%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: '1%',
                      paddingVertical: '2%',
                      backgroundColor: theme.colors.secondary,
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
                        {item.sign}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: theme.colors.onPrimary,
                          marginLeft: '3%',
                        }}>
                        {item?.value}
                      </Text>
                    </View>
                  </View>
                ))}
          </View>
        </View>
      </ScrollView>
      {/* // )} */}
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
