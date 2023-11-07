import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import {Avatar, Divider, Text, useTheme} from 'react-native-paper';
import HomeScreenAppbar from '../../../components/Appbars/HomeScreenAppbar';
const Index = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <HomeScreenAppbar title={'Investments'} />
      <View style={{marginHorizontal: '4%'}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: '3%',
          }}>
          Total investment balance
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
            <Text style={{fontSize: 20, color: theme.colors.onPrimary}}>$</Text>
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

        <View style={{marginTop: '1%'}}>
          <Text
            style={{
              color: theme.colors.tertiary,
              marginTop: '15%',
              marginLeft: 8,
              fontWeight: '700',
            }}>
            Your assets
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image
                size={40}
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image
                size={40}
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
        </View>

        <Divider style={{marginTop: '4%'}} />

        <View style={{marginTop: '4%'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
              marginTop: '3%',
            }}>
            Transaction history
          </Text>

          <View
            style={{
              textAlign: 'center',
              marginTop: '10%',
              alignItems:"center"
            }}>
            <Avatar.Icon size={70} style={{backgroundColor:theme.colors.background}} icon="airballoon-outline" />
            <Text
              style={{
                textAlign: 'center',
                marginTop: '2%',
              }}>
              No transaction history
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
