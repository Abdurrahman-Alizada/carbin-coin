import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Avatar, Card, Divider, Text, useTheme} from 'react-native-paper';
import HomeScreenAppbar from '../../../components/Appbars/HomeScreenAppbar';
import {useTranslation} from 'react-i18next';
import WalletIndex from '../../../Skeletons/Wallet/WalletIndex';
const Index = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    func()
  }, []);

const func = ()=>{
  setIsLoading(true)
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
}
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <HomeScreenAppbar title={'Savings'} />

      {isLoading ? (
        <WalletIndex />
      ) : (
        <ScrollView 
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={()=>func()} />
        }
        style={{marginHorizontal: '4%'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
              marginTop: '3%',
            }}>
            {t('Total balance in my Caribbean account')}
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
                90.00
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <Card style={{marginTop: '5%'}} mode="outlined">
            <Card.Content>
              <Text variant="bodyMedium" style={{textAlign: 'center'}}>
                {t(
                  'Your total balance is completely safe with our fund, Its the most secure safe you can even have.',
                )}
              </Text>
              <TouchableOpacity style={{marginTop: '3%', alignSelf: 'center'}}>
                <Text style={{color: theme.colors.tertiary}}>
                  {t('Read more')}
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          <Divider style={{marginTop: '4%'}} />

          <View style={{marginTop: '1%'}}>
            <Text
              style={{
                color: theme.colors.tertiary,
                marginTop: '15%',
                marginLeft: 8,
                fontWeight: '700',
              }}>
              {t('My earnings')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: '3%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: '1%',
                paddingVertical: '2%',
                backgroundColor: theme.colors.tertiary,
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: '3%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.onPrimary,
                    marginLeft: '2%',
                  }}>
                  {t('Total')}
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

            <View
              style={{
                flexDirection: 'row',
                marginTop: '3%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: '1%',
                paddingVertical: '2%',
                backgroundColor: theme.colors.tertiary,
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: '1%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.onPrimary,
                    marginLeft: '2%',
                  }}>
                  {t('This month')}
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

            <View
              style={{
                flexDirection: 'row',
                marginTop: '3%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: '1%',
                paddingVertical: '2%',
                backgroundColor: theme.colors.tertiary,
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: '1%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: theme.colors.onPrimary,
                    marginLeft: '2%',
                  }}>
                  October
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
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Index;
