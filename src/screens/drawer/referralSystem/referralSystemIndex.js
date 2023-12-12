import {
  Image,
  TouchableOpacity,
  View,
  Alert,
  Share,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {
  Appbar,
  Divider,
  IconButton,
  List,
  Snackbar,
  Text,
  useTheme,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

const Index = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const copyToClipboard = () => {
    Clipboard.setString(CurrentLoginUser.referralCode);
    onToggleSnackBar();
  };

  const CurrentLoginUser = useSelector(
    state => state.user.currentLoginUser.data,
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Use my code ( ${CurrentLoginUser?.referralCode} ) to create account in caribbean-coin`,
        title: 'Invitation code',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  console.log('first', CurrentLoginUser?.referredBy);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: '5%',
        }}>
        <View style={{alignItems: 'center', width: '38%'}}>
          <Appbar.BackAction
            style={{alignSelf: 'flex-start'}}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{alignItems: 'flex-start', width: '33%'}}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={require('../../../assets/splash-screen/carib-coin-logo.png')}
          />
        </View>
      </View>

      <View style={{}}>
        <Text style={{marginHorizontal: '6%'}}>
          Your referral code (click to copy)
        </Text>
        <TouchableOpacity
          onPress={copyToClipboard}
          style={{
            borderWidth: 1,
            margin: '5%',
            marginTop: '2%',
            borderRadius: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              lineHeight: 30,
              letterSpacing: 5,
              marginVertical: '5%',
              fontSize: 30,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {CurrentLoginUser?.referralCode}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: '5%',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}>
        <IconButton
          style={{}}
          mode="contained"
          onPress={copyToClipboard}
          size={45}
          icon={'link'}
        />
        <IconButton
          onPress={onShare}
          style={{}}
          mode="contained"
          size={45}
          icon={'share-variant'}
        />
      </View>

      <Divider style={{marginVertical: '5%'}} />

      {CurrentLoginUser?.referredBy && (
        <List.Section>
          <List.Subheader style={{}}>
            {t('You were referred by')}
          </List.Subheader>

          <List.Item
            title={
              CurrentLoginUser?.referredBy?.name
                ? CurrentLoginUser?.referredBy?.name
                : 'Unknown user'
            }
            description={CurrentLoginUser?.referredBy?.referralCode}
            onPress={() => {}}
            descriptionStyle={{color: theme.colors.grayLight}}
            left={props => (
              <List.Icon {...props} size={50} icon="account-circle-outline" />
            )}
          />
        </List.Section>
      )}
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={1000}>
        {t('Code copied successfully!')}
      </Snackbar>
    </View>
  );
};

export default Index;
