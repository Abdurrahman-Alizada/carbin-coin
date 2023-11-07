import React, {useState, useRef, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Text, Button} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import {ThemeContext} from '../../../../../themeContext';

const AddPhoneNumberIndex = ({navigation}) => {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = useContext(ThemeContext);

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

  const [isAddClicked, setIsAddClicked] = useState(false);
  return (
    <SafeAreaView
      style={{
        padding: '3%',
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <Text style={{textAlign: 'center', fontSize: 17, marginVertical: '3%'}}>
        Add your phone number so other member can easily send ou mone with
        Caribbean-coin
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
      <Button
        disabled={isAddClicked}
        loading={isAddClicked}
        mode="contained"
        contentStyle={{padding: '2%'}}
        onPress={() => {
          setIsAddClicked(true);
          const checkValid = phoneInput.current?.isValidNumber(value);
          setShowMessage(true);
          setValid(checkValid ? checkValid : false);
          setTimeout(() => {
            setIsAddClicked(false);
            checkValid &&
              navigation.navigate('OTPScreen', {phoneNumber: formattedValue});
          }, 3000);
        }}
        theme={{roundness: 5}}>
        Add
      </Button>

      {showMessage && (
        <View style={{marginTop: '4%'}}>
          <Text>Value : {value}</Text>
          <Text>Formatted Value : {formattedValue}</Text>
          <Text>Valid : {valid ? 'true' : 'false'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddPhoneNumberIndex;

const styles = StyleSheet.create({});
