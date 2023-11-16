import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List, Switch, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const CardSettingIndex = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();

  const [isLimit, setIsLimit] = useState(false);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [isCardFreeze, setIsCardFreeze] = useState(false);
  const [isIntrPayment, setIsIntrPayment] = useState(false);
  return (
    <View style={{marginTop: '5%', padding: '2%'}}>
      <List.Section>
        <List.Subheader style={{}}>{t('Card settings')}</List.Subheader>

        <List.Item
          title={t('Set limit')}
          description={t('Set a limit for spending')}
          onPress={() => {
            setIsLimit(!isLimit);
          }}
          descriptionStyle={{color: theme.colors.grayLight}}
          left={props => (
            <List.Icon {...props} size={40} icon="timer-sand-paused" />
          )}
          right={props => (
            <Switch
              {...props}
              value={isLimit}
              onValueChange={() => setIsLimit(!isLimit)}
            />
          )}
        />

        <List.Item
          title={t('Online payment')}
          description={t('Enable online transaction')}
          onPress={() => {
            setIsOnlinePayment(!isOnlinePayment);
          }}
          descriptionStyle={{color: theme.colors.grayLight}}
          left={props => <List.Icon {...props} size={40} icon="wifi" />}
          right={props => (
            <Switch
              {...props}
              value={isOnlinePayment}
              onValueChange={() => setIsOnlinePayment(!isOnlinePayment)}
            />
          )}
        />

        <List.Item
          title={t('Freeze Card')}
          description={t('Temporarily disable card usage')}
          onPress={() => {
            setIsCardFreeze(!isCardFreeze);
          }}
          descriptionStyle={{color: theme.colors.grayLight}}
          left={props => <List.Icon {...props} size={40} icon="lock" />}
          right={props => (
            <Switch
              {...props}
              value={isCardFreeze}
              onValueChange={() => setIsCardFreeze(!isCardFreeze)}
            />
          )}
        />

        <List.Item
          title={t('International payment')}
          description={t(
            "We'll access your location to prevent fraud operations",
          )}
          onPress={() => {
            setIsIntrPayment(!isIntrPayment);
          }}
          descriptionNumberOfLines={3}
          descriptionStyle={{color: theme.colors.grayLight}}
          left={props => <List.Icon {...props} size={40} icon="earth" />}
          right={props => (
            <Switch
              {...props}
              value={isIntrPayment}
              onValueChange={() => setIsIntrPayment(!isIntrPayment)}
            />
          )}
        />
      </List.Section>
    </View>
  );
};

export default CardSettingIndex;
