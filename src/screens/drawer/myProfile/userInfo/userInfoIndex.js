import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const userInfo = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [isNickNameEdit, setIsNickNameEdit] = useState(false);
  return (
    <View style={{paddingHorizontal: '3%'}}>
      <TextInput
        style={{
          marginTop: '2%',
          backgroundColor: theme.colors.background,
        }}
        label="Email"
        value="abcexample@gmail.com"
        keyboardType="numeric"
        editable={false}
      />

      <TextInput
        style={{
          marginTop: '5%',
          backgroundColor: theme.colors.background,
        }}
        label="Nick Name"
        value="khan"
        // onFocus={() => setIsNickNameEdit(true)}
        right={
          isNickNameEdit ? (
            <TextInput.Icon
              icon="check"
              onPress={() => setIsNickNameEdit(false)}
            />
          ) : (
            false ? <View></View> : <TextInput.Icon
              icon="pencil"
              onPress={() => setIsNickNameEdit(true)}
            />
          )
        }
      />

      <TextInput
        style={{
          marginTop: '5%',
          backgroundColor: theme.colors.background,
        }}
        label="Phone number"
        placeholder="+923457857653"
        keyboardType="numeric"
        onFocus={() => navigation.navigate('AddPhoneNumber')}
        right={
          <TextInput.Icon
            icon="plus"
            onPress={() => navigation.navigate('AddPhoneNumber')}
          />
        }
      />
    </View>
  );
};

export default userInfo;

const styles = StyleSheet.create({});
