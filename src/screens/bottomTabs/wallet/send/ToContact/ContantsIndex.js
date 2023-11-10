import React, {useEffect, useState} from 'react';
import {FlatList, Platform, View, StyleSheet} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import ContctListSkeleton from '../../../../../Skeletons/contactsList';

import Contacts from 'react-native-contacts';
import Contact from './Contacts';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {useTranslation} from 'react-i18next';

const ContactsList = ({navigation}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const CheckPermissions = () => {
    check(PERMISSIONS.ANDROID.READ_CONTACTS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            request(PERMISSIONS.ANDROID.READ_CONTACTS)
              .then(result => {
                console.log(result);
                if (result === 'granted') {
                  getContacts();
                }
              })
              .catch(error => {
                console.log(error.message);
              });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            getContacts();
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            getContacts();

            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log('error is=>', error.message);
      });
  };

  useEffect(() => {
    CheckPermissions();
  }, []);

  const [contacts, setContacts] = useState([]);

  const getContacts = () => {
    Contacts.getAll().then(contacts => {
      setContacts(contacts);
      setIsLoading(false);
    });
  };

  const searchContact = text => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      getContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContacts(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContacts(contacts);
      });
    }
  };

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };
  const renderItem = ({item, index}) => {
    return <Contact contact={item} />;
  };
  return (
    <View
      style={{
        paddingHorizontal: '2%',
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      {isLoading ? (
        <ContctListSkeleton />
      ) : (
        <View>
          <View>
            <TextInput
              style={{
                marginBottom: '4%',
                backgroundColor: theme.colors.background,
              }}
              label={t("Search in contact")}
              // keyboardType="numeric"
              onChangeText={searchContact}
              // right={<TextInput.Icon icon="qrcode-scan" onPress={()=>console.log("pressed ")} />}
              //   onChangeText={text => setText(text)}
            />
          </View>

          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      )}
    </View>
  );
};

export default ContactsList;
