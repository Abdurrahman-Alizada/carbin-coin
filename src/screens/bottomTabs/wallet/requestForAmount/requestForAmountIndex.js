import {FlatList, RefreshControl, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  Avatar,
  Button,
  Text,
  Divider,
  useTheme,
  Card,
  Portal,
  Dialog,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {
  useGetallTransactionsForUserQuery,
  useRequsestForAmountMutation,
  useRespondToTransactionMutation,
} from '../../../../redux/reducers/transactions/transactionsThunk';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ButtonLinearGradient from '../../../../components/ButtonLinearGradient';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError('amount must be a number')
    .positive('amount must be greater than zero')
    .required('amount is required')
    .label('amount'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('*required')
    .label('Email'),
});

const RequestForAmountIndex = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const currentLoginUser = useSelector(
    state => state.user.currentLoginUser.data,
  );

  const [visible, setVisible] = useState(false);

  const [dialogueError, setDialogueError] = useState('Something went wrong');
  const [dialogueErrorVisible, setDialogueErrorVisible] = useState(false);

  const {
    data: transactions,
    isError,
    error,
    isLoading: isTransLoading,
    refetch,
  } = useGetallTransactionsForUserQuery(currentLoginUser?._id);

  const formikRef = useRef();

  const [
    requsestForAmount,
    {isLoading: isRequestLoading, requestIsError, requestError},
  ] = useRequsestForAmountMutation();
  const submitHandler = values => {
    requsestForAmount({
      receiverId: currentLoginUser?._id,
      senderEmail: values?.email,
      amount: values?.amount,
      sign: '$',
      //   sign : selectedSign,
      currencyNickName: 'USD',
    })
      .then(res => {
        console.log('first', res);
      })
      .finally(() => {
        setVisible(false);
      });
  };

  const [
    respondToTransaction,
    {isLoading: isRespondLoading, respondIsError, respondError},
  ] = useRespondToTransactionMutation();

  const respondSubmitHandler = (status, transactionId) => {
    respondToTransaction({
      status: status,
      transactionId: transactionId,
    })
      .then(res => {
        if (res?.error?.data?.error) {
          setDialogueError(res?.error?.data?.error);
          setDialogueErrorVisible(true);
        }
        console.log('first', res);
      })
      .finally(() => {
        setVisible(false);
      });
  };

  const renderItem = ({item, index}) => {
    // console.log("first", item)
    return (
      <Card style={{marginVertical: '1%', paddingBottom: '2%'}}>
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
                {item?.amount?.sign}
              </Text>
            </Text>
            <Text variant="bodySmall">{item?.status}</Text>
          </View>
          <View style={{marginTop: '2%'}}>
            <Text variant="bodySmall" style={{}}>
              Date: {moment(item.createdAt).format('DD MMM YYYY')},{' '}
              {moment(item.createdAt).format('hh:mm a')}
            </Text>

            {currentLoginUser?._id == item?.senderId?._id && (
              <Text variant="bodySmall" style={{fontWeight:"700", marginTop: '1%'}}>
                {item?.receiverId?.name} requested from you
              </Text>
            )}
            {currentLoginUser?._id == item?.receiverId?._id && (
                <Text variant="bodySmall" style={{fontWeight:"700", marginTop: '1%'}}>
                  You ({item?.senderId?.name}) requested from {item?.receiverId?.name}
              </Text>
            )}
          </View>
        </Card.Content>

        {item?.status === 'pending' &&
          currentLoginUser?._id == item?.senderId?._id && (
            <View style={{flexDirection: 'row', marginTop: '2%'}}>
              <View style={{flexDirection: 'row'}}>
                {/* {isRespondLoading && (
                  <ActivityIndicator style={{marginHorizontal: '5%'}} />
                )} */}
                <Button
                  disabled={isRespondLoading}
                  onPress={() => respondSubmitHandler('accepted', item?._id)}
                  style={{marginRight: '3%'}}>
                  Accept
                </Button>
                <Button
                  disabled={isRespondLoading}
                  onPress={() => respondSubmitHandler('declined', item?._id)}
                  textColor={theme.colors.error}>
                  Decline
                </Button>
              </View>
            </View>
          )}
      </Card>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: '5%',
      }}>
      {/* <Text>RequestForAmountIndex</Text> */}
      <Button
        style={{marginTop: '5%'}}
        contentStyle={{
          padding: '3%',
          paddingLeft: '10%',
          alignSelf: 'flex-start',
        }}
        icon="arrange-send-backward"
        mode="contained-tonal"
        theme={{roundness: 2}}
        labelStyle={{fontSize: 18}}
        // onPress={() => setVisible(true)}>
        onPress={() => navigation.navigate("RequestForAmount")}>
        {t('Request for amount')}
      </Button>

      <Divider style={{marginVertical: '4%'}} />

      <View style={{marginVertical: '4%', flex:1}}>
        <FlatList
          data={transactions}
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
                  {t('No transaction history')}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    margin: '2%',
                  }}>
                  {t(
                    'All transaction, you sent amount to someone or receive will be appear here.',
                  )}
                </Text>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={isTransLoading} onRefresh={refetch} />
          }
        />
      </View>


      <Portal>
        <Dialog
          visible={dialogueErrorVisible}
          onDismiss={() => setDialogueErrorVisible(false)}>
          <Dialog.Title>Transaction error</Dialog.Title>
          <Dialog.Content>
            <Text>{dialogueError}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setDialogueErrorVisible(false);
                navigation.navigate('TopUp');
              }}>
              Deposit amount
            </Button>
            <Button onPress={() => setDialogueErrorVisible(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>User email and amount</Dialog.Title>
          <Dialog.Content>
            <Formik
              innerRef={formikRef}
              initialValues={{
                amount: '',
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={values => submitHandler(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <TextInput
                    label={t('Email')}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    mode="outlined"
                    value={values.email}
                    activeOutlineColor={theme.colors.secondary}
                    error={errors.email && touched.email ? true : false}
                    style={{marginTop: '2%'}}
                  />
                  {errors.email && touched.email ? (
                    <Text style={{color: theme.colors.error}}>
                      {errors.email}
                    </Text>
                  ) : null}

                  <TextInput
                    // label={t('Amount to request')}
                    label={t('amount')}
                    onChangeText={handleChange('amount')}
                    onBlur={handleBlur('amount')}
                    mode="outlined"
                    value={values.amount}
                    keyboardType="numeric"
                    activeOutlineColor={theme.colors.secondary}
                    error={errors.amount && touched.amount ? true : false}
                    style={{marginTop: '3%'}}
                  />
                  {errors.amount && touched.amount ? (
                    <Text style={{color: theme.colors.error}}>
                      {errors.amount}
                    </Text>
                  ) : null}

                  <ButtonLinearGradient
                    style={{
                      marginVertical: '5%',
                      width: '100%',
                      alignSelf: 'center',
                    }}>
                    <Button
                      loading={isRequestLoading}
                      disabled={isRequestLoading}
                      style={{
                        backgroundColor: 'transparent',
                      }}
                      contentStyle={{
                        padding: '3%',
                      }}
                      theme={{roundness: 1}}
                      mode="contained"
                      onPress={handleSubmit}>
                      {t('Request')}
                    </Button>
                  </ButtonLinearGradient>
                </View>
              )}
            </Formik>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default RequestForAmountIndex;
