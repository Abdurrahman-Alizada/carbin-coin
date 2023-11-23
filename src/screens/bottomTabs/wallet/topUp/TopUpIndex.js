import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Text,
  Button,
  useTheme,
  Divider,
  Card,
  Avatar,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useGetallTransactionsForUserQuery} from '../../../../redux/reducers/transactions/transactionsThunk';
import {useSelector} from 'react-redux';
import moment from 'moment';

const TopUpIndex = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();

  const currentLoginUser = useSelector(
    state => state.user.currentLoginUser?.data,
  );
  const {
    data: transactions,
    isError,
    error,
    isLoading: isTransLoading,
    refetch,
  } = useGetallTransactionsForUserQuery(currentLoginUser?._id);

  const renderItem = ({item, index}) => {
    
    return (
      <Card style={{margin: '0.5%'}}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text variant="titleLarge" style={{}}>
              {item?.amount?.value}{' '}
              <Text style={{textTransform: 'uppercase', fontSize: 14}}>
                {' '}
                {item?.amount?.sign}
              </Text>
            </Text>
            {/* <Text variant="titleMedium">{item?.status}</Text> */}
            <Text variant="bodySmall">{item?.cardInfo?.brand}</Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text variant="bodySmall" style={{}}>
              Date: {moment(item.createdAt).format("DD MMM YYYY")}, {moment(item.createdAt).format("hh:mm a")}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View
      style={{
        padding: '5%',
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <View style={{}}>
        <Button
          style={{marginTop: '5%'}}
          contentStyle={{
            padding: '3%',
            paddingLeft: '10%',
            alignSelf: 'flex-start',
          }}
          icon="bank"
          mode="contained-tonal"
          theme={{roundness: 2}}
          labelStyle={{fontSize: 18}}
          onPress={() => navigation.navigate('BankTransferTopUp')}>
          {t('Bank transfer')}
        </Button>
        <Button
          style={{marginTop: '5%'}}
          contentStyle={{
            padding: '3%',
            paddingLeft: '10%',
            alignSelf: 'flex-start',
          }}
          labelStyle={{fontSize: 18, alignSelf: 'flex-start'}}
          icon="credit-card"
          mode="contained-tonal"
          theme={{roundness: 2}}
          onPress={() => navigation.navigate('StripeIndex')}>
          {t('Card')}
        </Button>
      </View>
      <Divider style={{marginVertical: '5%'}} />

      <FlatList
        data={transactions?.data}
        // data={[]}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
              margin: '3%',
            }}>
            {t('Transaction history')}
          </Text>
        )}
        ListEmptyComponent={() => (
          <View style={{marginVertical: '4%'}}>
            <View
              style={{
                textAlign: 'center',
                marginTop: '7%',
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
                {t('Your deposit transactions will appear here')}
              </Text>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isTransLoading} onRefresh={refetch} />
        }
      />
    </View>
  );
};

export default TopUpIndex;

const styles = StyleSheet.create({});
