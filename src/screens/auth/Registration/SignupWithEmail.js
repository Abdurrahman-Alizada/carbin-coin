import React, {useRef, useState} from 'react';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {
  TextInput,
  Dialog,
  Text,
  Paragraph,
  Portal,
  Checkbox,
  useTheme,
  Button,
  IconButton,
} from 'react-native-paper';
import ConnectWallet from './ConnectWallet';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {
  useRegisterUserMutation,
  useResendEmailForUserRegistrationMutation,
  useCheckInvitaionCodeMutation,
} from '../../../redux/reducers/user/userThunk';
import AuthAppbar from '../../../components/Appbars/AuthAbbar';
import ButtonLinearGradient from '../../../components/ButtonLinearGradient';
import {useTranslation} from 'react-i18next';

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
  const [walletInputvisible, setWalletInputVisible] = useState(false);
  const [address, setAddress] = useState('');

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showTryAgainButton, setShowTryAgainButton] = useState(false);
  const email = useRef('');

  const [registerUser, {isLoading, isError, error}] = useRegisterUserMutation();
  const [
    CheckInvitaionCode,
    {
      isLoading: invitaionCodeLoading,
      isError: invitaionCodeIsError,
      error: invitaionCodeError,
    },
  ] = useCheckInvitaionCodeMutation();

  const [referringUser, setReferringUser] = useState('');
  const [referringUserMessage, setReferringUserMessage] = useState('');
  const [referringUserMessageSuccess, setReferringUserMessageSuccess] =
    useState('');
  const CheckInvitaionCodeHandler = async rc => {
    CheckInvitaionCode({
      referralCode: rc,
    })
      .then(res => {
        if (res?.error === 400) {
          setReferringUserMessage('Something went wrong');
          setReferringUserMessageSuccess('');
        } else if (res?.data?.message === 'Invalid code') {
          setReferringUserMessage('Invalid code');
          setReferringUserMessageSuccess('');
        } else if (res?.data?.referredBy) {
          setReferringUserMessage('');
          setReferringUser(res?.data?.referredBy)
          setReferringUserMessageSuccess('Code validated');
          setInvitationInputVisible(false)
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const submitHandler = async values => {
    email.current = values.email;
    const ethereum = {
      walletAddress: address,
    };
    registerUser({
      // name: values.name,
      email: values.email,
      password: values.password,
      ethereum: ethereum,
      isWallet: walletInputvisible,
      referredBy : referringUser
      // passwordConfirmation: values.passwordConfirmation,
    })
      .then(res => {
        console.log('first', res.error);
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
            invitationCode: '',
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
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
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

                <Dialog
                  visible={invitationInputvisible}
                  onDismiss={() => setInvitationInputVisible(false)}>
                  <View
                    style={{
                      paddingRight: '2%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: -0.5,
                    }}>
                    <Dialog.Title>Sign up</Dialog.Title>
                    <IconButton
                      onPress={() => setInvitationInputVisible(false)}
                      icon={'close'}
                    />
                  </View>

                  <Dialog.Content>
                    <TextInput
                      // error={errors.password && touched.password ? true : false}
                      label="Invitation code (optional)"
                      // mode="outlined"
                      style={{marginVertical: '2%'}}
                      onChangeText={handleChange('invitationCode')}
                      onBlur={handleBlur('invitationCode')}
                      autoFocus
                      value={values.invitationCode}
                      activeOutlineColor={theme.colors.secondary}
                    />
                    {invitaionCodeIsError ? (
                      <Text style={{color: theme.colors.error}}>
                        {invitaionCodeError?.error}
                      </Text>
                    ) : null}
                    {referringUserMessage ? (
                      <Text style={{color: theme.colors.error}}>
                        {referringUserMessage}
                      </Text>
                    ) : null}
                    {referringUserMessageSuccess ? (
                      <Text style={{color: '#15c186'}}>
                        {referringUserMessageSuccess}
                      </Text>
                    ) : null}
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      disabled={invitaionCodeLoading || !values.invitationCode}
                      loading={invitaionCodeLoading}
                      onPress={() => {
                        CheckInvitaionCodeHandler(values.invitationCode);
                      }}>
                      Check
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

              {walletInputvisible && (
                <TextInput
                  editable={false}
                  label="Wallet address"
                  mode="outlined"
                  style={{marginVertical: '2%'}}
                  value={address}
                  multiline
                  activeOutlineColor={theme.colors.secondary}
                />
              )}
              {invitationInputvisible || values.invitationCode ? (
                <TextInput
                  error={errors.password && touched.password ? true : false}
                  label="Invitation code (optional)"
                  mode="outlined"
                  editable={false}
                  style={{marginVertical: '2%'}}
                  onChangeText={handleChange('invitaionCode')}
                  onBlur={handleBlur('invitaionCode')}
                  value={values.invitationCode}
                  activeOutlineColor={theme.colors.secondary}
                  right={
                    <TextInput.Icon
                      icon={'pencil'}
                      onPress={() => setInvitationInputVisible(!showPassword)}
                    />
                  }
                />
              ) : (
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

              <ConnectWallet
                setWalletInputVisible={setWalletInputVisible}
                setAddress={setAddress}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default SignupWithEmail;
