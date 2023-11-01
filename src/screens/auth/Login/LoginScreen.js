import React, {useState} from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
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
  Portal,
  useTheme,
  Appbar,
  Menu,
  Divider,
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

  const [showPassword, setShowPassword] = useState(true);
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

      <Appbar.Header
        style={{backgroundColor: theme.colors.background}}
        // elevated={true}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Login"
          titleStyle={{
            color: theme.colors.onBackground,
          }}
        />

        <Menu
          visible={showMenu}
          onDismiss={closeMenu}
          contentStyle={{backgroundColor: theme.colors.background}}
          anchor={
            <Appbar.Action
              icon={'dots-vertical'}
              color={theme.colors.onBackground}
              onPress={() => openMenu()}
            />
          }>
          <Menu.Item
            leadingIcon="help-circle-outline"
            title="Help"
            titleStyle={{color: theme.colors.onBackground}}
            onPress={async () => {
              closeMenu();
              navigation.navigate('AppSettingsMain');
            }}
          />

          <Menu.Item
            leadingIcon="message-outline"
            title="Contact us"
            titleStyle={{color: theme.colors.onBackground}}
            onPress={async () => {
              closeMenu();
              navigation.navigate('AppSettingsMain');
            }}
          />
        </Menu>
      </Appbar.Header>

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

      <Text
        style={{
          fontSize: 20,
          marginTop: '3%',
          fontWeight: '700',
          paddingHorizontal: '5%',
        }}>
        Login your account.
      </Text>

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
              marginVertical: '2%',
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
                  marginVertical: '3%',
                }}
                contentStyle={{padding: '3%'}}
                buttonStyle={{padding: '1%'}}
                theme={{roundness: 1}}
                mode="contained"
                onPress={handleSubmit}
                buttonColor={theme.colors.blueBG}>
                Login
              </Button>

              <TouchableOpacity
                style={{marginVertical: '3%', alignSelf: 'center'}}
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
