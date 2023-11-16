import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {
  TextInput,
  Dialog,
  Text,
  Paragraph,
  Portal,
  Appbar,
  Avatar,
  Checkbox,
  useTheme,
  Menu,
  Button,
} from 'react-native-paper';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {
  useRegisterUserMutation,
  useResendEmailForUserRegistrationMutation,
} from '../../../redux/reducers/user/userThunk';
import AuthAppbar from '../../../components/Appbars/AuthAbbar';
import ButtonLinearGradient from '../../../components/ButtonLinearGradient';
import {useTranslation} from 'react-i18next';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    // .required('*required')
    .trim('Full name can not include leading and trailing spaces')
    .label('Name')
    .min(2, ({min}) => `Name must be at least ${min} characters`),
  email: Yup.string()
    .email('Please enter valid email')
    .required('*required')
    .label('Email'),
  password: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('*required')
    .label('Password'),
  passwordConfirmation: Yup.string()
    .required('*required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .label('passwordConfirmation'),
});

const SignupWithEmail = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const {t} = useTranslation();
  const [invitationInputvisible, setInvitationInputVisible] = useState(false);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showTryAgainButton, setShowTryAgainButton] = useState(false);
  const email = useRef('');

  const [registerUser, {isLoading, isError, error}] = useRegisterUserMutation();

  const submitHandler = async values => {
    email.current = values.email;
    registerUser({
      // name: values.name,
      email: values.email,
      password: values.password,
      // passwordConfirmation: values.passwordConfirmation,
    })
      .then(res => {
        if (res?.error?.status === 409) {
          setMessage(res?.error?.data?.message);
          setShowLoginButton(false);
          if (!res?.error?.data?.verified) {
            setShowTryAgainButton(true);
          }
          setVisible(true);
        } else if (
          res?.data?.message === 'An Email sent to your account please verify'
        ) {
          formikRef.current.resetForm();
          setMessage(
            `An Email sent to ${email.current}. Please verify and then login`,
          );
          setShowTryAgainButton(false);
          setShowLoginButton(true);
          setVisible(true);
        } else {
          setShowTryAgainButton(true);
          setShowLoginButton(true);
          setMessage('Something went wrong');
          setVisible(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [
    resendEmailForUserRegistration,
    {
      isLoading: resendLoading,
      isError: resendEmailIsError,
      error: resendEmailError,
    },
  ] = useResendEmailForUserRegistrationMutation();

  const resendEmail = () => {
    resendEmailForUserRegistration({
      email: email.current,
    })
      .then(res => {
        console.log(res);
        if (res?.error?.status === 409) {
          setMessage(res?.error?.data?.message);
          setVisible(true);
        } else if (
          res?.data?.message === 'An Email sent to your account please verify'
        ) {
          formikRef.current.resetForm();
          setMessage(
            'Again! An email sent to your account. Please verify and then login',
          );
          setShowTryAgainButton(false);
          setShowLoginButton(true);
          setVisible(true);
        } else {
          setShowTryAgainButton(true);
          setShowLoginButton(true);
          setMessage('Something went wrong');
          setVisible(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [checked, setChecked] = useState(false);

  const formikRef = useRef();

  const {isOpen, open, close, provider, isConnected, address} =
    useWalletConnectModal();

  const projectId = '4287ee7f1533e4a2b7f5d0937ba341cf';

  const providerMetadata = {
    name: 'caribbean-coin',
    description: 'Caribbean coin project',
    url: 'https://app.caribbean-coin.com/',
    icons: ['https://app.caribbean-coin.com/carib-coin-logo.png'],
    redirect: {
      native: 'YOUR_APP_SCHEME://',
      universal: 'YOUR_APP_UNIVERSAL_LINK.com',
    },
  };

  // Function to handle the
  // console.log('first', isOpen, isConnected, address);
  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <AuthAppbar title={'Sign up'} />

      <ScrollView
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingVertical: '2%',
        }}
        showsVerticalScrollIndicator={false}>
        <Formik
          innerRef={formikRef}
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            invitaionCode: '',
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
            <View style={{paddingHorizontal: '5%', marginTop: '10%'}}>
              <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(true)}>
                  <Dialog.Title>Sign up</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph> {message}</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    {showTryAgainButton && (
                      <Button
                        onPress={() => {
                          setVisible(false);
                          resendEmail();
                        }}>
                        Resend Email
                      </Button>
                    )}

                    {showLoginButton && (
                      <Button
                        onPress={() => {
                          setVisible(false);
                          navigation.navigate('Login');
                        }}>
                        Go to login
                      </Button>
                    )}

                    <Button
                      textColor={theme.colors.error}
                      onPress={() => {
                        setVisible(false);
                        email.current = '';
                      }}>
                      close
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

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
                <Text style={{color: theme.colors.error}}>{errors.email}</Text>
              ) : null}

              <TextInput
                error={errors.password && touched.password ? true : false}
                label={t('Password')}
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                secureTextEntry={!showPassword}
                style={{marginVertical: '2%'}}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                activeOutlineColor={theme.colors.secondary}
              />
              {errors.password && touched.password ? (
                <Text style={{color: theme.colors.error}}>
                  {errors.password}
                </Text>
              ) : null}

              <TextInput
                error={errors.password && touched.password ? true : false}
                label={t('Confirm password')}
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={showPasswordConfirmation ? 'eye' : 'eye-off'}
                    onPress={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                  />
                }
                secureTextEntry={!showPasswordConfirmation}
                style={{marginVertical: '2%'}}
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                value={values.passwordConfirmation}
                activeOutlineColor={theme.colors.secondary}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <Text style={{color: theme.colors.error}}>
                  {errors.passwordConfirmation}
                </Text>
              ) : null}

              {invitationInputvisible ? (
                <TextInput
                  error={errors.password && touched.password ? true : false}
                  label="Invitation code (optional)"
                  mode="outlined"
                  style={{marginVertical: '2%'}}
                  onChangeText={handleChange('invitaionCode')}
                  onBlur={handleBlur('invitaionCode')}
                  value={values.invitaionCode}
                  activeOutlineColor={theme.colors.secondary}
                />
              ) : (
                // {errors.passwordConfirmation && touched.passwordConfirmation ? (
                //   <Text style={{color: theme.colors.error}}>
                //     {errors.passwordConfirmation}
                //   </Text>
                // ) : null}
                <TouchableOpacity
                  style={{marginVertical: '5%', alignSelf: 'center'}}
                  onPress={() =>
                    setInvitationInputVisible(!invitationInputvisible)
                  }>
                  <Text
                    style={{fontWeight: 'bold', color: theme.colors.secondary}}>
                    {t('I have an invitation')}
                  </Text>
                </TouchableOpacity>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: '3%',
                }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 17, marginHorizontal: '1%'}}>
                    {t('I agree to')}
                  </Text>
                  <TouchableOpacity style={{marginLeft: '1%'}}>
                    <Text
                      style={{
                        color: theme.colors.purpleLight,
                        fontSize: 17,
                        textDecorationLine: 'underline',
                      }}>
                      {t('terms and conditions')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ButtonLinearGradient style={{marginTop: '4%'}}>
                <Button
                  loading={isLoading || resendLoading}
                  disabled={isLoading || resendLoading}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  contentStyle={{
                    padding: '3%',
                  }}
                  theme={{roundness: 1}}
                  mode="contained"
                  onPress={handleSubmit}>
                  {t('Sign up')}
                </Button>
              </ButtonLinearGradient>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  marginVertical: '5%',
                }}>
                or
              </Text>

              <Button
                // loading={isLoading || resendLoading}
                // disabled={isLoading || resendLoading}
                contentStyle={{
                  padding: '3%',
                }}
                icon={isConnected ? "close-circle" : "wallet"}
                theme={{roundness: 15}}
                mode={isConnected ? "contained-tonal" : "elevated"}
                onPress={handleButtonPress}>
                {isConnected ? t('Disconnect wallet') :  t('Connect wallet')}
              </Button>
              <Text style={{marginTop: '5%'}}>{isConnected ? "Wallet address:": ""} {address}</Text>
            </View>
          )}
        </Formik>
      </ScrollView>
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </View>
  );
};

export default SignupWithEmail;
