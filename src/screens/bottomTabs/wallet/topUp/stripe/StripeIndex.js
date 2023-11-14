import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CardField,CardForm, useStripe} from '@stripe/stripe-react-native';
import {
  StripeProvider,
  confirmPayment,
  createToken,
} from '@stripe/stripe-react-native';
import {publishKey, secretKey} from '../../../../../utils/stripe';
import ButtonLinearGradient from '../../../../../components/ButtonLinearGradient';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {
  useStripPaymentMutation,
  useSavePaymentOnSuccessMutation,
} from '../../../../../redux/reducers/transactions/transactionsThunk';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

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
        value: data?.amount,
        sign: data?.currency,
      },
    };

    savePaymentOnSuccess(obj).then(res => {
      setLoading(false);
      navigation.pop(2);
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
      amount: amountD,
      currency: 'INR',
    };
    try {
      if (cardInfo) {
        setLoading(true);

        const res = await stripPayment(apiData);

        if (res?.data?.paymentIntent) {
          let confirmPaymentIntent = await confirmPayment(
            res?.data?.paymentIntent,
            {paymentMethodType: 'Card'},
          );

          console.log('confirmPaymentIntent res++++', confirmPaymentIntent);

          if (confirmPaymentIntent.paymentIntent) {
            console.log('first if');
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

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
      }}>
      <StripeProvider
        publishableKey={publishKey}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <TextInput
          label={t('$ deposit')}
          mode="outlined"
          keyboardType="numeric"
          style={{marginVertical: '2%'}}
          onChangeText={e => setAmountD(e)}
          value={amountD}
          activeOutlineColor={theme.colors.secondary}
        />
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
    </View>
  );
};

export default StripeIndex;

const styles = StyleSheet.create({
  cardField: {
    height: 35,
    width: '90%',
    marginBottom: 20,
  },
  cardForm: {
    height: 270,
    width: '80%',
  },
});
