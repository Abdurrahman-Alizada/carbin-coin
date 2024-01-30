import React, {useState} from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  TextInput,
  Text,
  Button,
  Dialog,
  Avatar,
  Paragraph,
  Banner,
  Checkbox,
  Portal,
  useTheme,
} from 'react-native-paper';
import {useLoginUserMutation} from '../../../redux/reducers/user/userThunk';
import {
  handleCurrentLoaginUser,
  handlePasswordResetSuccessfully,
} from '../../../redux/reducers/user/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import AuthAppbar from '../../../components/Appbars/AuthAbbar';
import ButtonLinearGradient from '../../../components/ButtonLinearGradient';
import {t} from 'i18next';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Type your valid email address')
    .required('*required')
    .label('Email'),
  password: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('*required')
    .label('Password'),
});

const LoginScreen = ({navigation, route}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const passwordResetSuccessflly = useSelector(
    state => state?.user?.passwordResetSuccessflly,
  );

  const [verificationBannerVisible, setVerificationBannerVisible] = useState(
    route.params ? true : false,
  );

  const [bannerMessage, setBannerMessage] = useState(
    route?.params?.message ? route?.params?.message : '',
  );

  const [errorMessage, setErrorMessage] = useState('Something went wrong');

  const [loginUser, {isLoading, isError, error}] = useLoginUserMutation();
  const submitHandler = async (values, actions) => {
    const response = await loginUser({
      email: values.email,
      password: values.password,
    });
    console.log("first", response)
    if (response?.error) {
      setErrorMessage(response?.error?.data?.message);
      setVisible(true);
    }

    if (response?.data?.message == "Email Not Verified") {
      setErrorMessage('An Email was sent to your account please verify then login');
      setVisible(true);
    }
    if (response?.data?.token) {

      dispatch(handleCurrentLoaginUser({email:values.email, role:response?.data?.role}));
      await AsyncStorage.setItem('isLoggedIn', 'login');
      await AsyncStorage.setItem('token', response?.data?.token);
      await AsyncStorage.setItem('userId', response?.data?._id);
      await AsyncStorage.setItem('email', values.email);
      actions.resetForm();
      navigation.navigate('Main');
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <AuthAppbar title={'Sign in'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingVertical: '2%',
        }}>


        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(true)}>
            <Dialog.Title>Sign in</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {' '}
                {errorMessage} {isError && error?.error}
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Banner
          visible={passwordResetSuccessflly}
          actions={[
            {
              label: 'Ok',
              onPress: () => dispatch(handlePasswordResetSuccessfully(false)),
            },
          ]}
          // style={{paddingHorizontal:"5%"}}
          icon={({size}) => <Avatar.Icon size={size} icon="check-bold" />}>
          Your password has been reset successfully. You can sign in now with
          the updated password.
        </Banner>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            submitHandler(values, actions);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            // dirty,
            // isValid,
          }) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                marginTop: '10%',
                paddingHorizontal: '5%',
              }}>
              <View>
                <TextInput
                  error={errors.email && touched.email ? true : false}
                  label={t('Email')}
                  // placeholder="Enter your email"
                  mode="outlined"
                  style={{marginTop: '2%'}}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  activeOutlineColor={theme.colors.secondary}
                />
                {errors.email && touched.email ? (
                  <Text style={{color: theme.colors.error}}>
                    {errors.email}
                  </Text>
                ) : null}
                <TextInput
                  error={errors.password && touched.password ? true : false}
                  label={t('Password')}
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye' : 'eye-off'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  mode="outlined"
                  style={{marginTop: '2%'}}
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

                <ButtonLinearGradient style={{marginVertical:"5%"}}>
                  <Button
                    loading={isLoading}
                    // disabled={!(dirty && isValid) || isLoading}
                    disabled={isLoading}
                    style={{
                      backgroundColor: 'transparent',
                      // marginVertical: '5%',
                    }}
                    contentStyle={{padding: '3%'}}
                    // buttonStyle={{padding: '1%'}}
                    theme={{roundness: 1}}
                    mode="contained"
                    onPress={handleSubmit}
                    buttonColor={theme.colors.blueBG}>
                    {t('Log in')}
                  </Button>
                </ButtonLinearGradient>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>
                    {t("New to Caribbean-coin")}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginVertical: '5%',
                      marginHorizontal: '3%',
                      alignSelf: 'center',
                    }}
                    onPress={() => navigation.navigate('SignUpwithEmail')}>
                    <Text
                      style={{fontWeight: 'bold', color: theme.colors.textRed}}>
                      {t("Sign up")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{marginVertical: '5%', alignSelf: 'center'}}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text
                    style={{fontWeight: 'bold', color: theme.colors.textRed}}>
                   {t("Forgot password")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  img: {
    width: 100,
    alignSelf: 'center',
    height: 100,
    borderRadius: 400,
  },

  buttonStyle: {
    height: 60,
    justifyContent: 'flex-start',
    paddingHorizontal: 50,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: '2%',
    backgroundColor: '#EDEEF0',
  },
  buttonTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    // marginLeft: 20,
  },
});
