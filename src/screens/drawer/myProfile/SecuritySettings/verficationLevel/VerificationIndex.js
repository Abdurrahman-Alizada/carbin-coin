import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Card,
  Chip,
  Text,
  Button,
  List,
  useTheme,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import {NativeModules} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {handleResponse1} from '../../../../../redux/reducers/user/user';
import {useEditUserAfterKYCMutation} from '../../../../../redux/reducers/user/userThunk';
const {ShuftiproReactNativeModule} = NativeModules;

const VerificationIndex = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);

  const currentLoginUser = useSelector(
    state => state.user?.currentLoginUser?.data,
  );

  const response1 = useSelector(state => state.user?.response1);
  const [editUserAfterKYC, {isLoading, isError, error}] =
    useEditUserAfterKYCMutation();

  const updateUserAfterKYC = data => {
    // const parsedResponse = JSON.parse(response1); // Parse the JSON string into an object
    const parsedResponse = JSON.parse(data); // Parse the JSON string into an object
    console.log(parsedResponse);
    let isKYCVerified = 0;
    if (parsedResponse?.event == 'verification.accepted') {
      isKYCVerified = 1;
    } else if (parsedResponse?.event == 'verification.declined') {
      isKYCVerified = 2;
    } else if (parsedResponse?.event == 'verification.cancelled') {
      isKYCVerified = 0;
    }

    const document = parsedResponse?.verification_data;
    const verification_result = parsedResponse?.verification_result;
    const info = parsedResponse?.info;
    const declined_reason = parsedResponse?.declined_reason;
    const country = parsedResponse?.country;
    editUserAfterKYC({
      userId: currentLoginUser?._id,
      isKYCVerified: isKYCVerified,
      KYCVerificationData: {
        document: document,
        verification_result: verification_result,
        info: info,
        declined_reason: declined_reason,
      },
      country: country,
    })
      .then(res => {
        console.log('response is=> ', res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const KYCHandler = async () => {
    const config = {
      open_webview: false,
      asyncRequest: false,
      captureEnabled: false,
    };

    const verificationObj = {
      reference: currentLoginUser?._id,
      country: '',
      language: '',
      email: currentLoginUser?.email,
      callback_url: 'http://www.example.com',
      redirect_url: 'http://www.example.com',
      show_consent: 1,
      show_results: 1,
      verification_mode: 'image_only',
      show_privacy_policy: 1,
      open_webview: false,
      face: {proof: ''},
      document: {
        supported_types: ['passport', 'id_card', 'driving_license'],
        name: {
          first_name: '',
          last_name: '',
          middle_name: '',
        },
        dob: '',
        document_number: '',
        expiry_date: '',
        issue_date: '',
        fetch_enhanced_data: '',
        gender: '',
        backside_proof_required: '0',
      },
    };
    const auth = {
      auth_type: 'basic_auth',
      client_id:
        '18c706836926948084e9763ee08ef891485caefdff9de003a5bfe824b0a7bb58',
      secret_key: 'P5jOjBD2GOBZK2ZlInFDLf5Y5QZHnzAS',
    };

    ShuftiproReactNativeModule.verify(
      JSON.stringify(verificationObj),
      JSON.stringify(auth),
      JSON.stringify(config),
      res => {
        const parsedResponse = JSON.parse(res); // Parse the JSON string into an object
        console.log('first', typeof res, typeof parsedResponse);
        if (parsedResponse.event !== 'verification.cancelled') {
          setResponse(parsedResponse);
          dispatch(handleResponse1(parsedResponse?.body));
          updateUserAfterKYC(parsedResponse?.body);
        }
      },
    );
    // navigation.navigate('IDVerificationCountry')
  };

  const KYCStatusText = useSelector(state => state.user.KYCStatusText);
  const KYCStatusIcon = useSelector(state => state.user.KYCStatusIcon);
  const isKYCVerified = useSelector(state => state.user.isKYCVerified);

  const [visible, setVisible] = useState(false);
  const [dialogText, setDialogText] = useState('');

  return (
    <View
      style={{
        padding: '3%',
        backgroundColor: theme.colors.background,
        flex: 1,
      }}>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Verification</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogText}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View
        style={{
          marginHorizontal: '3%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>{t('Your status')}</Text>
        <Chip
          icon={KYCStatusIcon}
          mode="outlined"
          style={{
            borderRadius: 12,
          }}
          onPress={() => console.log('Pressed')}>
          {t(KYCStatusText)}
        </Chip>
      </View>

      <Card mode="outlined" style={{marginTop: '7%'}}>
        <Card.Title title={t('Verification method')} />
        <Card.Content>
          {isKYCVerified == 1 ||
          isKYCVerified == 2 ||
          isKYCVerified == 3 ||
          isKYCVerified == 4 ? (
            <Button
              icon="plus"
              mode="outlined"
              contentStyle={{padding: '2%'}}
              theme={{roundness: 10}}
              onPress={() => {
                if (isKYCVerified == 1) {
                  setDialogText(
                    "Your status is pending.\n Please wait for admin approval.\n It'll take 2 to 4 working days.",
                  );
                } else if (isKYCVerified == 2) {
                  setDialogText('Your KYC declined.\n Please contact support.');
                } else if (isKYCVerified == 3) {
                  setDialogText(
                    'Your KYC declined by admin.\n Please contact support.',
                  );
                } else if (isKYCVerified == 4) {
                  setDialogText(
                    'Your are a verified user.\n You do not need KYC again.',
                  );
                }
                setVisible(true);
              }}>
              {t('Photo ID, face scan')}
            </Button>
          ) : (
            <Button
              icon="plus"
              mode="outlined"
              contentStyle={{padding: '2%'}}
              theme={{roundness: 10}}
              onPress={KYCHandler}
              disabled={isKYCVerified == 1}>
              {t('Photo ID, face scan')}
            </Button>
          )}

          <Button
            icon="home-city"
            disabled
            mode="contained-tonal"
            style={{padding: '2%', marginTop: '3%'}}
            theme={{roundness: 10}}
            onPress={() => updateUserAfterKYC()}>
            {t('Proof of address')}
          </Button>
        </Card.Content>
      </Card>

      <Card mode="outlined" style={{marginTop: '3%'}}>
        <Card.Title title={t('Current features')} />
        <Card.Content>
          <List.Item
            title={t('Digital cash accounts')}
            // description="available"
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="check" />}
            right={props => (
              <Text style={{alignSelf: 'center'}}>{t('Available')}</Text>
            )}
          />
          <List.Item
            title={t('Internal transfer per day')}
            // description="available"
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="check" />}
            right={props => (
              <Text style={{alignSelf: 'center'}}>10000 FHT</Text>
            )}
          />
        </Card.Content>
      </Card>

      <Card mode="outlined" style={{marginTop: '3%'}}>
        <Card.Title title={t('Premium features')} />
        <Card.Content>
          <List.Item
            title={t('Digital cash accounts')}
            // description="available"
            left={props => <List.Icon {...props} icon="lock" />}
            right={props => (
              <Text style={{alignSelf: 'center'}}>{t('Available')}</Text>
            )}
          />
          <List.Item
            title={t('Internal transfer per day')}
            // description="available"
            titleNumberOfLines={2}
            left={props => <List.Icon {...props} icon="lock" />}
            right={props => (
              <Text {...props} style={{alignSelf: 'center'}}>
                50000 FHT
              </Text>
            )}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default VerificationIndex;

const styles = StyleSheet.create({});
