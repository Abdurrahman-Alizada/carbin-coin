import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Divider, Text, useTheme} from 'react-native-paper';
import HomeScreenAppbar from '../../../components/Appbars/HomeScreenAppbar';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import CountryFlag from 'react-native-country-flag';
import WalletIndex from '../../../Skeletons/Wallet/WalletIndex';
const Index = () => {
  const theme = useTheme();
  const {t} = useTranslation();

  const curr = useSelector(state => state.user.curr);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    func();
  }, []);

  const func = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: theme.colors.background,
      }}>
      <HomeScreenAppbar title={'Investments'} />

      {isLoading ? (
        <WalletIndex />
      ) : (
        <View style={{flex: 1, paddingHorizontal: '4%'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
              marginTop: '3%',
            }}>
            {t('Total investment balance')}
          </Text>

          <TouchableWithoutFeedback onPress={() => console.log('pressed')}>
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
                0
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={{marginTop: '1%'}}>
            <Text
              style={{
                color: theme.colors.tertiary,
                marginTop: '5%',
                marginLeft: 8,
                fontWeight: '700',
              }}>
              {t('Your assets')}
            </Text>

            <View style={{paddingHorizontal: '4%'}}>
              {curr.slice(1, 2).map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                  }}
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
                      paddingVertical: '2%',
                      paddingHorizontal: '4%',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <CountryFlag isoCode={item?.countryCode} size={22} />
                      <Text
                        style={{
                          fontSize: 18,
                          marginLeft: '10%',
                          color: theme.colors.onSecondary,
                        }}>
                        {item.nickName}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: '5%',
                        color: theme.colors.onSecondary,
                      }}>
                      {item.sign} {item.balance}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Divider style={{marginVertical: '4%'}} />

          <View style={{marginVertical: '4%'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                textAlign: 'center',
                marginTop: '3%',
              }}>
              {t('Transaction history')}
            </Text>

            <View
              style={{
                textAlign: 'center',
                marginTop: '10%',
                alignItems: 'center',
              }}>
              <Avatar.Icon
                size={70}
                style={{backgroundColor: theme.colors.background}}
                icon="airballoon-outline"
              />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: '2%',
                }}>
                {t('No transaction history')}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
