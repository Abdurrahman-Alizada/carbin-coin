import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Button, Dialog, Portal, PaperProvider, Text} from 'react-native-paper';
const Contact = ({contact}) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.contactCon}
        onPress={showDialog}
        >
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            <Text style={styles.txt}>{contact?.givenName?.charAt(0)}</Text>
          </View>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.givenName + ' '} 
            {contact?.middleName && contact?.middleName + ' '}
            {contact?.familyName}
          </Text>
          <Text style={styles.phoneNumber}>
            {+9203121234567}
            {/* {contact?.phoneNumbers[0]?.number} */}
          </Text>
        </View>
      </TouchableOpacity>
  
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>You pressed on:</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{contact?.givenName}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
  
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
});
