import {TouchableOpacity, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  Button,
  IconButton,
  SegmentedButtons,
  Text,
  useTheme,
  TextInput,
  Portal,
  Dialog,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ButtonLinearGradient from '../../../../components/ButtonLinearGradient';
import {
  useGetallTransactionsForUserQuery,
  useRequsestForAmountMutation,
} from '../../../../redux/reducers/transactions/transactionsThunk';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import {
  validationSchema,
  validationSchemaForEmail,
  validationSchemaForName,
  validationSchemaForPhone,
} from './components/validationSchemas';

const RequestPage = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const {t} = useTranslation();
  const [value, setValue] = useState('email');
  const currentLoginUser = useSelector(
    state => state.user.currentLoginUser.data,
  );

  const [visible, setVisible] = useState(false);
  const [requestForPaymentMessage, setRequestForPaymentMessage] = useState('');

  const formikRef = useRef();

  const [
    requsestForAmount,
    {isLoading: isRequestLoading, requestIsError, requestError},
  ] = useRequsestForAmountMutation();

  const submitHandlerUsingEmail = values => {
    requsestForAmount({
      receiverId: currentLoginUser?._id,
      senderEmail: values?.email,
      amount: values?.amount,
      method: 'email',
      sign: '$',
      currencyNickName: 'USD',
    }).then(res => {
      if (res?.data?.transactionRequest) {
        setRequestForPaymentMessage('Request submitted successfully');
        setVisible(true);
      }
      if (res?.error?.data?.error) {
        setRequestForPaymentMessage(res?.error?.data?.error);
        setVisible(true);
      }
    });
  };
  const submitHandlerUsingPhoneNumber  = values => {
    requsestForAmount({
      receiverId: currentLoginUser?._id,
      senderPhoneNumber: values?.phoneNumber,
      amount: values?.amount,
      method: 'phoneNumber',
      sign: '$',
      currencyNickName: 'USD',
    }).then(res => {
      if (res?.data?.transactionRequest) {
        setRequestForPaymentMessage('Request submitted successfully');
        setVisible(true);
      }
      if (res?.error?.data?.error) {
        setRequestForPaymentMessage(res?.error?.data?.error);
        setVisible(true);
      }
    });
  };
  const submitHandlerUsingName =  values => {
    requsestForAmount({
      receiverId: currentLoginUser?._id,
      senderName: values?.name,
      amount: values?.amount,
      method: 'name',
      sign: '$',
      currencyNickName: 'USD',
    }).then(res => {
      if (res?.data?.transactionRequest) {
        setRequestForPaymentMessage('Request submitted successfully');
        setVisible(true);
      }
      if (res?.error?.data?.error) {
        setRequestForPaymentMessage(res?.error?.data?.error);
        setVisible(true);
      }
    });
  };

  return (
    <View
      style={{
        padding: '3%',
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <IconButton
        icon={'close'}
        style={{alignSelf: 'flex-end'}}
        onPress={() => navigation.goBack()}
      />
      <View style={{marginTop: '3%'}}>
        <Text>Select method for request</Text>
        <View style={{marginTop: '5%'}}>
          <SegmentedButtons
            value={value}
            onValueChange={value => {
              setValue(value);
            }}
            buttons={[
              {
                value: 'email',
                label: 'Email',
                icon: 'email-outline',
                checkedColor: theme.colors.primary,
              },
              {
                value: 'phoneNumber',
                label: 'Phone',
                icon: 'phone-dial-outline',
                checkedColor: theme.colors.primary,
              },
              {
                value: 'name',
                label: 'Name',
                icon: 'account-outline',
                checkedColor: theme.colors.primary,
              },
            ]}
          />
          {value == 'email' && (
            <Formik
              innerRef={formikRef}
              initialValues={{
                amount: '',
                email: '',
              }}
              validationSchema={validationSchemaForEmail}
              onSubmit={values => submitHandlerUsingEmail(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={{marginTop: '10%'}}>
                  <Text>Enter email and amount</Text>

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
                        padding: '2%',
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
          )}

          {value == 'phoneNumber' && (
            <Formik
              innerRef={formikRef}
              initialValues={{
                amount: '',
                phoneNumber: '',
              }}
              validationSchema={validationSchemaForPhone}
              onSubmit={values => submitHandlerUsingPhoneNumber(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={{marginTop: '10%'}}>
                  <Text>Enter phone number and amount</Text>

                  <TextInput
                    label={t('Phone number')}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    mode="outlined"
                    value={values.phoneNumber}
                    activeOutlineColor={theme.colors.secondary}
                    error={
                      errors.phoneNumber && touched.phoneNumber ? true : false
                    }
                    style={{marginTop: '2%'}}
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <Text style={{color: theme.colors.error}}>
                      {errors.phoneNumber}
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
                        padding: '2%',
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
          )}

          {value == 'name' && (
            <Formik
              innerRef={formikRef}
              initialValues={{
                amount: '',
                name: '',
              }}
              validationSchema={validationSchemaForName}
              onSubmit={values => submitHandlerUsingName(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={{marginTop: '10%'}}>
                  <Text>Enter name and amount</Text>

                  <TextInput
                    label={t('Name')}
                    // onChangeText={handleChange('name')}
                    onChangeText={text => handleChange('name')(text.trim())}
                    onBlur={handleBlur('name')}
                    mode="outlined"
                    value={values.name}
                    activeOutlineColor={theme.colors.secondary}
                    error={errors.name && touched.name ? true : false}
                    style={{marginTop: '2%'}}
                  />
                  {errors.name && touched.name ? (
                    <Text style={{color: theme.colors.error}}>
                      {errors.name}
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
                        padding: '2%',
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
          )}
        </View>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Request for payment</Dialog.Title>
          <Dialog.Content>
            <Text>{requestForPaymentMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
                formikRef.current.resetForm();
              }}>
              Request another payment
            </Button>
            {/* <Button
              onPress={() => {
                setVisible(false);
                navigation.goBack();
              }}>
              Go back
            </Button> */}
            <Button
              onPress={() => {
                setVisible(false);
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default RequestPage;
