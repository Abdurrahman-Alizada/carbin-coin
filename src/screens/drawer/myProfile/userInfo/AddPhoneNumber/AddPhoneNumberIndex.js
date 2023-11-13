import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useRef, useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Text, Button} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import ButtonLinearGradient from '../../../../../components/ButtonLinearGradient';
import {useUpdateUserMutation} from '../../../../../redux/reducers/user/userThunk';
import {ThemeContext} from '../../../../../themeContext';

const AddPhoneNumberIndex = ({navigation, route}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const {toggleTheme, isThemeDark} = useContext(ThemeContext);

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  const [isAddClicked, setIsAddClicked] = useState(false);

  const id = useRef(null);
  const token = useRef(null);

  const getUserInfo = async () => {
    id.current = await AsyncStorage.getItem('userId');
    token.current = await AsyncStorage.getItem('token');
    // console.log("id=>",id.current,"token=>", token.current);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const {name, _id } = route.params?.params?.user;
  const [updateUser, {isLoading, isError, error}] = useUpdateUserMutation();
  const updateHandler = () => {
    updateUser({
      _id: _id,
      token: token.current,
      name: name,
      phone: formattedValue,
      fullName: name,
    })
      .then(res => {
        console.log('response', res);
        navigation.goBack()
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView
      style={{
        padding: '3%',
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <Text style={{textAlign: 'center', fontSize: 17, marginVertical: '3%'}}>
        {t(
          'Add your phone number so other member can easily send you money with Caribbean-coin',
        )}
      </Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        withDarkTheme={isThemeDark}
        defaultCode="TW"
        onChangeText={text => {
          setValue(text);
        }}
        autoFocus
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        containerStyle={{
          marginVertical: '4%',
          borderWidth: 1,
          width: '100%',
          borderRadius: 10,
          borderColor: '#ccc',
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        layout="second"
      />
      <ButtonLinearGradient style={{}}>
        <Button
          disabled={isAddClicked || isLoading}
          loading={isAddClicked || isLoading}
          mode="contained"
          style={{backgroundColor: 'transparent'}}
          contentStyle={{padding: '2%'}}
          onPress={() => {
            setIsAddClicked(true);
            const checkValid = phoneInput.current?.isValidNumber(value);
            setShowMessage(true);
            setValid(checkValid ? checkValid : false);
            setIsAddClicked(false);
            checkValid && updateHandler();
            //   navigation.navigate('OTPScreen', {phoneNumber: formattedValue});
          }}
          theme={{roundness: 5}}>
          Add
        </Button>
      </ButtonLinearGradient>

      {showMessage && (
        <View style={{marginTop: '10%'}}>
          <Text style={{marginTop: '2%'}}>Phone number : {value}</Text>
          <Text style={{marginTop: '2%'}}>
            Formatted phone number : {formattedValue}
          </Text>
          <Text style={{marginTop: '2%'}}>
            Valid : {valid ? 'Valid' : 'Phone number is not valid'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddPhoneNumberIndex;

const styles = StyleSheet.create({});
