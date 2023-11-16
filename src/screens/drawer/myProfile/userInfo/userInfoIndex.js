import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Dialog, Portal, TextInput, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUpdateUserMutation} from '../../../../redux/reducers/user/userThunk';

const userInfo = ({user, token}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [isNickNameEdit, setIsNickNameEdit] = useState(false);
  const [nickName, setNickName] = useState(user?.data?.name);

  const [error1, setError] = useState('');
  const [updateUser, {isLoading, isError, error}] = useUpdateUserMutation();
  const updateHandler = () => {
    updateUser({
      _id: user?.data?._id,
      token: token,
      name: nickName,
      phone: user?.data?.phone,
      fullName: user?.data?.fullName,
    })
      .then(res => {
        setError('');
        setIsNickNameEdit(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
// +1 315 628 0624
// luon gmi nhh oan d 29 635@gmail.com
// caribcoinuser32167 
return (
    <View style={{paddingHorizontal: '3%'}}>
      <Portal>
        <Dialog
          visible={isNickNameEdit}
          onDismiss={() => setIsNickNameEdit(false)}>
          <Dialog.Title>Update your nick name</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label={t('Nick name')}
              mode="outlined"
              style={{marginTop: '2%'}}
              onChangeText={e => setNickName(e)}
              autoFocus
              value={nickName}
              activeOutlineColor={theme.colors.secondary}
            />
            {error1 && (
              <Text style={{color: theme.colors.error}}>*{error1}</Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setIsNickNameEdit(false)}
              textColor={theme.colors.error}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                if (/\s/.test(nickName)) {
                  setError('No white space is allowd');
                } else {
                  updateHandler();
                }
                // setIsNickNameEdit(false)
              }}
              loading={isLoading}
              disabled={isLoading}>
              Update
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <TextInput
        style={{
          marginTop: '2%',
          backgroundColor: theme.colors.background,
        }}
        label={t('Email')}
        value={user?.data?.email}
        editable={false}
      />

      <TextInput
        style={{
          marginTop: '5%',
          backgroundColor: theme.colors.background,
        }}
        label={t('Nick Name')}
        value={nickName}
        onChangeText={e => setNickName(e)}
        editable={isNickNameEdit}
        // onFocus={() => setIsNickNameEdit(true)}
        right={
          // isNickNameEdit ? (
          //   <TextInput.Icon
          //     icon="check"
          //     onPress={() => {
          //       setIsNickNameEdit(false);
          //       console.log(nickName);
          //     }}
          //   />
          // ) : (
          <TextInput.Icon
            icon="pencil"
            onPress={() => {
              setIsNickNameEdit(true);
            }}
          />
          //   )
        }
      />

      <TextInput
        style={{
          marginTop: '5%',
          backgroundColor: theme.colors.background,
        }}
        label={'Phone number'}
        value={user?.data?.phone}
        // placeholder="+923457857653"
        keyboardType="numeric"
        onFocus={() =>
          navigation.navigate('AddPhoneNumber', {
            params: {user: user?.data},
          })
        }
        right={
          <TextInput.Icon
            icon="plus"
            onPress={
              () =>
                navigation.navigate('AddPhoneNumber', {
                  params: {user: user?.data},
                })
              // navigation.navigate('AddPhoneNumber', {params: {user: user}})
            }
          />
        }
      />
    </View>
  );
};

export default userInfo;
