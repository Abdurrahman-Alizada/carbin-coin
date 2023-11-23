import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CardField, CardForm, useStripe} from '@stripe/stripe-react-native';
import {
  StripeProvider,
  confirmPayment,
  createToken,
} from '@stripe/stripe-react-native';
import {publishKey, secretKey} from '../../../../../utils/stripe';
import ButtonLinearGradient from '../../../../../components/ButtonLinearGradient';
import {
  ActivityIndicator,
  Button,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  Provider,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {
  useStripPaymentMutation,
  useSavePaymentOnSuccessMutation,
  useGetTraditionalCurrenciesListQuery,
} from '../../../../../redux/reducers/transactions/transactionsThunk';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import CountryFlag from 'react-native-country-flag';

const StripeIndex = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();

  const [cardInfo, setCardInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [amountD, setAmountD] = useState('');

  const currentLoginUser = useSelector(
    state => state.user?.currentLoginUser?.data,
  );

  const {
    data: traditionalCurrencies,
    isError: IsCrrencyError,
    error: currencyError,
    isLoading: isCurrencyLoading,
    refetch,
  } = useGetTraditionalCurrenciesListQuery();
  const [selectedTraditionalCurrency, setSelectedTraditionalCurrency] =
    useState(traditionalCurrencies?.USD);

  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  useEffect(() => {
    setSelectedTraditionalCurrency(traditionalCurrencies?.USD);
  }, [traditionalCurrencies]);

  const [stripPayment, {isLoading, isError, error}] = useStripPaymentMutation();

  const [
    savePaymentOnSuccess,
    {
      isLoading: isSavePaymentOnSuccessLoading,
      isError: IsSavePaymentOnSuccessError,
      error: savePaymentOnSuccessError,
    },
  ] = useSavePaymentOnSuccessMutation();

  const onPaymentSuccessHandler = data => {
    const obj = {
      userId: currentLoginUser?._id,
      cardInfo: {
        brand: data?.paymentMethod?.Card?.brand,
        country: data?.paymentMethod?.Card?.country,
        expMonth: data?.paymentMethod?.Card?.expMonth,
        expYear: data?.paymentMethod?.Card?.expYear,
        last4: data?.paymentMethod?.Card?.last4,
      },
      status: 'Fiat',
      amount: {
        value: data?.amount / 100,
        sign: data?.currency,
      },
      currency: selectedTraditionalCurrency,
    };

    savePaymentOnSuccess(obj).then(res => {
      // console.log(res);
      setLoading(false);
      setMessage('Your money has been deposited successfully!');
      setVisible(true);
      // setTimeout(() => {
      //   navigation.pop(2);
      // }, 1000);
    });
  };

  const fetchCardDetail = cardDetail => {
    // console.log("my card details",cardDetail)
    if (cardDetail?.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const onDone = async () => {
    let apiData = {
      amount: amountD * 100,
      currency: selectedTraditionalCurrency?.nickName,
    };
    try {
      if (cardInfo) {
        setLoading(true);

        const res = await stripPayment(apiData);
        console.log('first if', res?.data);

        if (res?.data?.paymentIntent) {
          let confirmPaymentIntent = await confirmPayment(
            res?.data?.paymentIntent,
            {paymentMethodType: 'Card'},
          );

          // console.log('confirmPaymentIntent res++++', confirmPaymentIntent);

          if (confirmPaymentIntent.paymentIntent) {
            // console.log('first if');
            onPaymentSuccessHandler(confirmPaymentIntent.paymentIntent);
          }
        }
        setLoading(false);
      } else {
        alert('Please enter card info!!!');
      }
    } catch (error) {
      console.log('Error rasied during payment intent', error);
    }

    // console.log('cardInfocardInfocardInfo', cardInfo);
    // if (cardInfo) {
    //   try {
    //     stripPayment().then((res)=>{
    //         console.log(res)
    //     })
    //     // const resToken = await createToken({...cardInfo, type: 'Card'});
    //     // console.log('resToken', resToken);
    //   } catch (error) {
    //     alert('Error raised during create token');
    //   }
    // }
  };

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: '5%',
        paddingHorizontal: '4%',
      }}>
      <StripeProvider
        publishableKey={publishKey}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <TextInput
          label={t('Amount')}
          mode="outlined"
          keyboardType="numeric"
          style={{marginVertical: '2%'}}
          onChangeText={e => setAmountD(e)}
          value={amountD}
          activeOutlineColor={theme.colors.secondary}
        />

        <TouchableOpacity
          onPress={() => {
            onOpen();
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.colors.onBackground,
          }}>
          {isCurrencyLoading ? (
            <ActivityIndicator
              style={{
                marginHorizontal: '5%',
              }}
            />
          ) : (
            <Text
              style={{
                marginHorizontal: '5%',
                fontWeight: 'bold',
              }}>
              {selectedTraditionalCurrency?.nickName}
            </Text>
          )}
          <IconButton size={25} icon="chevron-down" />
        </TouchableOpacity>

        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            fetchCardDetail(cardDetails);
          }}
          onFocus={focusedField => {
            // console.log('focusField', focusedField);
          }}
        />

        <ButtonLinearGradient style={{marginVertical: '2%'}}>
          <Button
            style={{backgroundColor: 'transparent'}}
            contentStyle={{padding: '3%'}}
            mode="contained"
            onPress={onDone}
            loading={loading}
            disabled={loading}>
            Done
          </Button>
        </ButtonLinearGradient>
      </StripeProvider>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(true)}>
          <Dialog.Title>Deposit</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {message ? message : message}
              {/* {errorMessage} {isError && error?.error} */}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Ok</Button>
            <Button
              onPress={() => {
                setVisible(false);
                navigation.pop(2);
              }}>
              Go to wallet
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Modalize
          handlePosition="inside"
          // adjustToContentHeight={true}
          modalHeight={500}
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
          {isCurrencyLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={{paddingHorizontal: '2%'}}>
              {Object.values(
                traditionalCurrencies ? traditionalCurrencies : {},
              )?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTraditionalCurrency(item);
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
                      item?.nickName === selectedTraditionalCurrency?.nickName
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
                      {item.name}
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
          )}
        </Modalize>
      </Portal>
    </View>
  );
};

export default StripeIndex;
