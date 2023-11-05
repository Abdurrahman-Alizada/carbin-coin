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

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    // .required('*required')
    .label('Password'),
  newPassword: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    // .required('*required')
    .label('Password'),
  passwordConfirmation: Yup.string()
    // .required('*required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .label('passwordConfirmation'),
});

const SignupWithEmail = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showTryAgainButton, setShowTryAgainButton] = useState(false);
  const email = useRef('');

  const submitHandler = async values => {
    navigation.navigate('Profile');
  };

  const resendEmail = () => {};

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  
    const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const formikRef = useRef();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingRight: '2%',
          marginBottom: '5%',
        }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />

        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={require('../../../../assets/splash-screen/carib-coin-logo.png')}
          />
          <Text
            style={{
              fontSize: 22,
              marginTop: '5%',
              // fontWeight: '700',
              textAlign: 'center',
              paddingHorizontal: '5%',
            }}>
            Set the new password
          </Text>
        </View>

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
              // navigation.navigate('AppSettingsMain');
            }}
          />

          <Menu.Item
            leadingIcon="message-outline"
            title="Contact us"
            titleStyle={{color: theme.colors.onBackground}}
            onPress={async () => {
              closeMenu();
              // navigation.navigate('AppSettingsMain');
            }}
          />
        </Menu>
      </View>

      <ScrollView
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
        />

        <Formik
          innerRef={formikRef}
          initialValues={{
            oldPassword: '',
            newPassword: '',
            passwordConfirmation: '',
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
            <View style={{paddingHorizontal: '5%'}}>
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
                error={errors.oldPassword && touched.oldPassword ? true : false}
                label="Existing password"
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                secureTextEntry={!showPassword}
                style={{marginVertical: '2%'}}
                onChangeText={handleChange('oldPassword')}
                onBlur={handleBlur('oldPassword')}
                value={values.oldPassword}
                activeOutlineColor={theme.colors.secondary}
              />
              {errors.oldPassword && touched.oldPassword ? (
                <Text style={{color: theme.colors.error}}>
                  {errors.oldPassword}
                </Text>
              ) : null}

<TextInput
                error={errors.newPassword && touched.newPassword ? true : false}
                label="New password"
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={showNewPassword ? 'eye' : 'eye-off'}
                    onPress={() =>
                      setShowNewPassword(!showNewPassword)
                    }
                  />
                }
                secureTextEntry={!showNewPassword}
                style={{marginVertical: '2%'}}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                activeOutlineColor={theme.colors.secondary}
              />
              {errors.newPassword && touched.newPassword ? (
                <Text style={{color: theme.colors.error}}>
                  {errors.newPassword}
                </Text>
              ) : null}


              <TextInput
                error={errors.passwordConfirmation && touched.passwordConfirmation ? true : false}
                label="Confirm password"
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

              <Button
                // loading={isLoading || resendLoading}
                // disabled={isLoading || resendLoading}
                style={{
                  marginTop: '4%',
                }}
                contentStyle={{
                  padding: '3%',
                }}
                theme={{roundness: 1}}
                mode="contained"
                onPress={handleSubmit}
                buttonColor={theme.colors.blueBG}>
                Update
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default SignupWithEmail;
