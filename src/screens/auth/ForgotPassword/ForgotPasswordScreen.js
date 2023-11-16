import {StyleSheet, View, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  TextInput,
  Button,
  useTheme,
  Portal,
  Dialog,
  Text,
  Paragraph,
} from 'react-native-paper';
import {useForgotPasswordMutation} from '../../../redux/reducers/user/userThunk';
import AuthAppbar from '../../../components/Appbars/AuthAbbar';
import ButtonLinearGradient from '../../../components/ButtonLinearGradient';
import {useTranslation} from 'react-i18next';

const ForgotPassword = ({navigation}) => {
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const theme = useTheme();
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [isDisabled, setDisibility] = useState(true);

  const checkEmail = e => {
    setDisibility(!regex.test(e));
    setEmail(e);
  };

  const [forgotPassword, {isLoading, isError, error}] =
    useForgotPasswordMutation();
  const sendEmail = () => {
    setDisibility(true);
    navigation.navigate('OTPScreen1');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <AuthAppbar title={'Forgot password'} />

      <View style={{paddingVertical: '5%', paddingHorizontal: '4%'}}>
        <TextInput
          label="Enter your Email"
          mode="outlined"
          value={email}
          activeOutlineColor={theme.colors.secondary}
          onChangeText={e => checkEmail(e)}
        />

        <ButtonLinearGradient
          style={{
            marginVertical: '4%',
          }}>
          <Button
            icon="email-send"
            mode="contained"
            disabled={isDisabled}
            loading={isLoading}
            contentStyle={{padding: '3%'}}
            style={{backgroundColor: 'transparent'}}
            theme={{roundness: 1}}
            onPress={sendEmail}>
            {t('Continue')}
          </Button>
        </ButtonLinearGradient>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
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
});
