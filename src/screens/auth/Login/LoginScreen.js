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
import {userApi} from '../../../redux/reducers/user/userThunk';
import {groupApi} from '../../../redux/reducers/groups/groupThunk';
import {friendshipApi} from '../../../redux/reducers/Friendship/friendshipThunk';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Type your valid email address')
    // .required('*required')
    .label('Email'),
  password: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    // .required('*required')
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
    navigation.navigate('Main');
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        paddingVertical: '2%',
      }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(true)}>
          <Dialog.Title>Sign in Error</Dialog.Title>
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
        Your password has been reset successfully. You can sign in now with the
        updated password.
      </Banner>

      <View style={{alignItems: 'center'}}>
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={require('../../../assets/splash-screen/carib-coin-logo.png')}
          // source={require('../../../assets')}
        />
        <Text
          style={{
            fontSize: 22,
            marginTop: '5%',
            // fontWeight: '700',
            textAlign: 'center',
            paddingHorizontal: '5%',
          }}>
          Log in
        </Text>
      </View>
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
                label="Email"
                // placeholder="Enter your email"
                mode="outlined"
                style={{marginTop: '2%'}}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                activeOutlineColor={theme.colors.secondary}
              />
              {errors.email && touched.email ? (
                <Text style={{color: theme.colors.error}}>{errors.email}</Text>
              ) : null}
              <TextInput
                error={errors.password && touched.password ? true : false}
                label="Password"
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

              <Button
                loading={isLoading}
                // disabled={!(dirty && isValid) || isLoading}
                disabled={isLoading}
                style={{
                  marginVertical: '5%',
                }}
                contentStyle={{padding: '3%'}}
                buttonStyle={{padding: '1%'}}
                theme={{roundness: 1}}
                mode="contained"
                onPress={handleSubmit}
                buttonColor={theme.colors.blueBG}>
                Login
              </Button>

              <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:"center"}}>
                <Text style={{fontWeight: 'bold'}}>New to caribbean-coin</Text>
                <TouchableOpacity
                  style={{marginVertical: '5%',marginHorizontal:"3%", alignSelf: 'center'}}
                  onPress={() => navigation.navigate('SignUpwithEmail')}>
                  <Text style={{fontWeight: 'bold', color:theme.colors.textRed}}>Sing up</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{marginVertical: '5%', alignSelf: 'center'}}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={{fontWeight: 'bold', color: theme.colors.textRed}}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
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
